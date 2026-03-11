import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import type { Paper, PaperIndex, Stats } from '../src/lib/types'

const PAPERS_DIR = path.join(process.cwd(), 'src/content/papers')
const OUTPUT_DIR = path.join(process.cwd(), 'public/api')

function readPapers(): Paper[] {
  const files = fs.readdirSync(PAPERS_DIR).filter(f => f.endsWith('.yaml'))
  const papers: Paper[] = []

  for (const file of files) {
    const slug = path.basename(file, '.yaml')
    const content = fs.readFileSync(path.join(PAPERS_DIR, file), 'utf-8')
    const data = yaml.parse(content)

    const required = ['title', 'venue', 'year', 'abstract', 'tags', 'date_added']
    for (const field of required) {
      if (data[field] === undefined) {
        console.warn(`Warning: ${file} missing required field: ${field}`)
      }
    }

    papers.push({
      slug,
      title: data.title,
      venue: data.venue,
      year: data.year,
      authors: data.authors || [],
      abstract: data.abstract,
      tags: data.tags || [],
      repo: data.repo,
      project_page: data.project_page,
      arxiv: data.arxiv,
      pdf: data.pdf,
      preview_image: data.preview_image,
      preview_video: data.preview_video,
      date_added: data.date_added,
    })
  }

  papers.sort((a, b) => b.date_added.localeCompare(a.date_added))
  return papers
}

function buildStats(papers: Paper[]): Stats {
  const venues: Record<string, number> = {}
  const years: Record<number, number> = {}
  const tags: Record<string, number> = {}

  for (const paper of papers) {
    venues[paper.venue] = (venues[paper.venue] || 0) + 1
    years[paper.year] = (years[paper.year] || 0) + 1
    for (const tag of paper.tags) {
      tags[tag] = (tags[tag] || 0) + 1
    }
  }

  return {
    total_papers: papers.length,
    papers_with_repo: papers.filter(p => p.repo).length,
    venues,
    years,
    tags,
    generated_at: new Date().toISOString(),
  }
}

function main() {
  const papers = readPapers()

  fs.mkdirSync(path.join(OUTPUT_DIR, 'papers'), { recursive: true })

  const index: PaperIndex = {
    data: papers,
    meta: { count: papers.length, generated_at: new Date().toISOString() },
  }
  fs.writeFileSync(path.join(OUTPUT_DIR, 'papers.json'), JSON.stringify(index, null, 2))

  for (const paper of papers) {
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'papers', `${paper.slug}.json`),
      JSON.stringify(paper, null, 2)
    )
  }

  const stats = buildStats(papers)
  fs.writeFileSync(path.join(OUTPUT_DIR, 'stats.json'), JSON.stringify(stats, null, 2))

  const withRepo = papers.filter(p => p.repo).length
  console.log(`Built ${papers.length} papers, ${withRepo} with repos`)
  console.log(`Venues: ${Object.keys(stats.venues).join(', ')}`)
  console.log(`Output: ${OUTPUT_DIR}`)
}

main()
