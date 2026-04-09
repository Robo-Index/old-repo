import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import { Octokit } from '@octokit/rest'
import type { RepoMeta, RepoMetaIndex } from '../src/lib/types'

const PAPERS_DIR = path.join(process.cwd(), 'src/content/papers')
const OUTPUT_PATH = path.join(process.cwd(), 'data/repos.json')
const DELAY_MS = 1000

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/\/$/, '')
}

function extractRepoUrls(): string[] {
  const files = fs.readdirSync(PAPERS_DIR).filter((f) => f.endsWith('.yaml'))
  const urls = new Set<string>()

  for (const file of files) {
    const content = fs.readFileSync(path.join(PAPERS_DIR, file), 'utf-8')
    const data = yaml.parse(content)
    if (data.repo) {
      urls.add(normalizeUrl(data.repo))
    }
  }

  return Array.from(urls)
}

function parseOwnerRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null
  return { owner: match[1], repo: match[2] }
}

async function fetchRepoMeta(owner: string, repo: string): Promise<RepoMeta | null> {
  try {
    const { data } = await octokit.repos.get({ owner, repo })
    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      open_issues: data.open_issues_count,
      language: data.language,
      license: data.license?.spdx_id ?? null,
      description: data.description,
      pushed_at: data.pushed_at!,
      topics: data.topics || [],
      owner_avatar: data.owner?.avatar_url || '',
      full_name: data.full_name,
      html_url: data.html_url,
      created_at: data.created_at!,
    }
  } catch (err: unknown) {
    const e = err as { status?: number }
    console.error(`  Failed ${owner}/${repo}: ${e.status || err}`)
    return null
  }
}

async function main() {
  const urls = extractRepoUrls()
  console.log(`Found ${urls.length} unique repo URLs`)

  const data: Record<string, RepoMeta> = {}
  let fetched = 0
  let failed = 0

  for (const url of urls) {
    const parsed = parseOwnerRepo(url)
    if (!parsed) {
      console.log(`  Skipping non-GitHub URL: ${url}`)
      continue
    }

    await sleep(DELAY_MS)
    const meta = await fetchRepoMeta(parsed.owner, parsed.repo)
    if (meta) {
      data[normalizeUrl(url)] = meta
      fetched++
      console.log(`  [${fetched}/${urls.length}] ${meta.full_name} ★${meta.stars}`)
    } else {
      failed++
    }
  }

  const output: RepoMetaIndex = {
    data,
    meta: { count: fetched, fetched_at: new Date().toISOString() },
  }

  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2))

  console.log(`\nDone: ${fetched} fetched, ${failed} failed`)
  console.log(`Output: ${OUTPUT_PATH}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
