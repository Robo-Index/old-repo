import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { Octokit } from '@octokit/rest'

const PAPERS_DIR = path.join(process.cwd(), 'src/content/papers')
const TODAY = new Date().toISOString().slice(0, 10)
const DELAY_MS = 2500 // 2.5s between requests (GitHub Search: 30 req/min)

const SEARCH_QUERIES = [
  // Direct mention
  '"RA-L" in:readme',
  '"Robotics and Automation Letters" in:readme',
  '"IEEE Robotics and Automation Letters" in:readme',
  '"RA-L" in:description',
  '"Robotics and Automation Letters" in:description',
  // BibTeX journal field
  '"journal={IEEE Robotics and Automation Letters}" in:readme',
  '"journal = {IEEE Robotics and Automation Letters}" in:readme',
  // Accepted/published phrasing variants
  '"accepted to RA-L" in:readme',
  '"published in RA-L" in:readme',
  '"accepted by RA-L" in:readme',
  '"RA-L 2024" in:readme',
  '"RA-L 2025" in:readme',
  '"RA-L 2026" in:readme',
  '"RA-L 2023" in:readme',
  '"RA-L 2022" in:readme',
  '"RA-L 2021" in:readme',
  '"RA-L 2020" in:readme',
  // Topic-based
  'topic:ra-l',
  'topic:ral',
  'topic:robotics-and-automation-letters',
  // With ICRA/IROS transfer mention
  '"RA-L" "ICRA" in:readme',
  '"RA-L" "IROS" in:readme',
]

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function loadExistingRepoUrls(): Set<string> {
  const urls = new Set<string>()
  if (!fs.existsSync(PAPERS_DIR)) return urls
  const files = fs.readdirSync(PAPERS_DIR).filter((f) => f.endsWith('.yaml'))
  for (const file of files) {
    const content = fs.readFileSync(path.join(PAPERS_DIR, file), 'utf-8')
    const data = yaml.parse(content)
    if (data.repo) {
      urls.add(data.repo.toLowerCase().replace(/\/$/, ''))
    }
  }
  return urls
}

function loadExistingSlugs(): Set<string> {
  const slugs = new Set<string>()
  if (!fs.existsSync(PAPERS_DIR)) return slugs
  const files = fs.readdirSync(PAPERS_DIR).filter((f) => f.endsWith('.yaml'))
  for (const file of files) {
    slugs.add(path.basename(file, '.yaml'))
  }
  return slugs
}

function scoreRepo(
  repo: { fork: boolean; name: string; description: string | null },
  readme: string
): number {
  let score = 0
  const readmeLower = readme.toLowerCase()
  const name = repo.name.toLowerCase()
  const desc = (repo.description || '').toLowerCase()

  // Positive signals
  if (/accepted\s+(to|by)\s+ra-l/i.test(readme)) score += 3
  if (/published\s+in\s+ra-l/i.test(readme)) score += 3
  if (/@(article|inproceedings)\s*\{/i.test(readme)) score += 3 // BibTeX
  if (/arxiv\.org\/abs\/\d{4}\.\d{4,5}/.test(readme)) score += 2
  if (/^#{1,3}\s*abstract/im.test(readme)) score += 2
  if (/\bpaper\b/.test(desc) || /\bcode\s+for\b/.test(desc)) score += 1

  // Negative signals
  if (repo.fork) score -= 5
  if (name.startsWith('awesome')) score -= 5
  if (/\blist\b/.test(name) || /\bsurvey\b/.test(name)) score -= 3

  return score
}

function extractTitle(readme: string, repoName: string): string {
  // First # heading
  const match = readme.match(/^#\s+(.+)$/m)
  if (match) {
    // Clean markdown links, images, badges
    let title = match[1]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](url) → text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
      .replace(/<[^>]+>/g, '') // HTML tags
      .trim()
    if (title.length > 0 && title.length < 200) return title
  }
  return repoName
}

function extractYear(readme: string, createdAt: string): number {
  const match = readme.match(/RA-L[^0-9]*?(20\d{2})/i)
  if (match) return parseInt(match[1])
  // Fallback: try "Robotics and Automation Letters" with year
  const match2 = readme.match(
    /Robotics\s+and\s+Automation\s+Letters[^0-9]*?(20\d{2})/i
  )
  if (match2) return parseInt(match2[1])
  return new Date(createdAt).getFullYear()
}

function extractAbstract(
  readme: string,
  description: string | null
): string {
  // Text under ## Abstract heading
  const match = readme.match(
    /^#{1,3}\s*abstract\s*\n+([^\n#]+(?:\n[^\n#]+)*)/im
  )
  if (match) {
    const text = match[1]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // strip links
      .replace(/<[^>]+>/g, '') // strip HTML
      .replace(/\s+/g, ' ')
      .trim()
    // Take first sentence
    const sentence = text.match(/^[^.!?]+[.!?]/)
    if (sentence && sentence[0].length > 20) return sentence[0].trim()
    if (text.length > 20 && text.length < 300) return text
  }
  // Fallback to repo description
  if (description && description.length > 10) {
    const sentence = description.match(/^[^.!?]+[.!?]/)
    if (sentence) return sentence[0].trim()
    return description
  }
  return ''
}

function extractArxiv(readme: string): string | undefined {
  const match = readme.match(/arxiv\.org\/abs\/(\d{4}\.\d{4,5})/i)
  if (match) return `https://arxiv.org/abs/${match[1]}`
  return undefined
}

function extractTags(topics: string[]): string[] {
  if (!topics || topics.length === 0) return []
  // Map GitHub topics to kebab-case tags, filter out generic ones
  const ignore = new Set([
    'python',
    'pytorch',
    'ros',
    'ros2',
    'deep-learning',
    'machine-learning',
    'paper',
    'code',
    'research',
    'robotics',
    'robot',
  ])
  return topics
    .map((t) => t.toLowerCase().replace(/\s+/g, '-'))
    .filter((t) => !ignore.has(t))
    .slice(0, 5)
}

function makeSlug(name: string, existingSlugs: Set<string>): string {
  let slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  if (!existingSlugs.has(slug)) return slug
  // Append suffix for collision
  for (let i = 2; i < 100; i++) {
    const candidate = `${slug}-${i}`
    if (!existingSlugs.has(candidate)) return candidate
  }
  return slug
}

function buildYaml(paper: {
  title: string
  year: number
  abstract: string
  tags: string[]
  repo: string
  arxiv?: string
  project_page?: string
}): string {
  const doc: Record<string, unknown> = {
    title: paper.title,
    venue: 'RA-L',
    year: paper.year,
    authors: [],
    abstract: paper.abstract,
    tags: paper.tags,
    repo: paper.repo,
  }
  if (paper.arxiv) doc.arxiv = paper.arxiv
  if (paper.project_page) doc.project_page = paper.project_page
  doc.date_added = TODAY
  return yaml.stringify(doc)
}

async function fetchReadme(owner: string, repo: string): Promise<string> {
  try {
    const { data } = await octokit.repos.getReadme({ owner, repo, mediaType: { format: 'raw' } })
    return data as unknown as string
  } catch {
    return ''
  }
}

async function main() {
  const existingUrls = loadExistingRepoUrls()
  const existingSlugs = loadExistingSlugs()
  const seenOwnerRepo = new Set<string>()
  let added = 0
  let skipped = 0
  let lowScore = 0

  console.log(`Loaded ${existingUrls.size} existing repo URLs, ${existingSlugs.size} slugs`)

  for (const query of SEARCH_QUERIES) {
    const fullQuery = `${query} created:2020-01-01..2026-12-31`
    console.log(`\nSearching: ${fullQuery}`)

    let page = 1
    let hasMore = true

    while (hasMore && page <= 10) {
      await sleep(DELAY_MS)

      let response
      try {
        response = await octokit.search.repos({
          q: fullQuery,
          per_page: 30,
          page,
          sort: 'updated',
        })
      } catch (err: unknown) {
        const e = err as { status?: number; response?: { headers?: Record<string, string> } }
        if (e.status === 403) {
          const reset = e.response?.headers?.['x-ratelimit-reset']
          if (reset) {
            const waitSec = Math.max(0, parseInt(reset) - Math.floor(Date.now() / 1000)) + 5
            console.log(`Rate limited, waiting ${waitSec}s...`)
            await sleep(waitSec * 1000)
            continue
          }
        }
        console.error(`Search error: ${err}`)
        break
      }

      const items = response.data.items
      if (items.length === 0) {
        hasMore = false
        break
      }

      for (const item of items) {
        const ownerRepo = `${item.owner?.login}/${item.name}`.toLowerCase()
        const repoUrl = item.html_url.toLowerCase().replace(/\/$/, '')

        // Dedup: already processed in this run
        if (seenOwnerRepo.has(ownerRepo)) continue
        seenOwnerRepo.add(ownerRepo)

        // Dedup: already in existing papers
        if (existingUrls.has(repoUrl)) {
          skipped++
          continue
        }

        // Fetch README and score
        await sleep(DELAY_MS)
        const readme = await fetchReadme(item.owner!.login, item.name)

        const score = scoreRepo(
          {
            fork: item.fork,
            name: item.name,
            description: item.description,
          },
          readme
        )

        if (score < 3) {
          lowScore++
          continue
        }

        // Extract metadata
        const title = extractTitle(readme, item.name)
        const year = extractYear(readme, item.created_at!)
        const abstract = extractAbstract(readme, item.description)
        const arxiv = extractArxiv(readme)
        const tags = extractTags((item.topics as string[]) || [])
        const projectPage = item.homepage || undefined
        const slug = makeSlug(item.name, existingSlugs)

        if (!abstract) {
          console.log(`  Skipping ${ownerRepo}: no abstract`)
          continue
        }

        const yamlContent = buildYaml({
          title,
          year,
          abstract,
          tags,
          repo: item.html_url,
          arxiv,
          project_page: projectPage,
        })

        const filePath = path.join(PAPERS_DIR, `${slug}.yaml`)
        fs.writeFileSync(filePath, yamlContent)
        existingSlugs.add(slug)
        existingUrls.add(repoUrl)

        console.log(`  + ${slug} (score=${score}, year=${year})`)
        added++
      }

      // Check if more pages
      const totalCount = response.data.total_count
      if (page * 30 >= totalCount || page * 30 >= 1000) {
        hasMore = false
      }
      page++
    }
  }

  console.log(`\nDone: ${added} added, ${skipped} already known, ${lowScore} below threshold`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
