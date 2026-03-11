import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import type { Paper } from './types'

const PAPERS_DIR = path.join(process.cwd(), 'src/content/papers')

function parsePaper(file: string): Paper {
  const slug = path.basename(file, '.yaml')
  const content = fs.readFileSync(path.join(PAPERS_DIR, file), 'utf-8')
  const data = yaml.parse(content)

  return {
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
  }
}

export function getAllPapers(): Paper[] {
  const files = fs.readdirSync(PAPERS_DIR).filter(f => f.endsWith('.yaml'))
  const papers = files.map(parsePaper)
  papers.sort((a, b) => b.date_added.localeCompare(a.date_added))
  return papers
}

export function getPaperBySlug(slug: string): Paper | undefined {
  const file = `${slug}.yaml`
  const filePath = path.join(PAPERS_DIR, file)
  if (!fs.existsSync(filePath)) return undefined
  return parsePaper(file)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  for (const paper of getAllPapers()) {
    for (const tag of paper.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}

export function getAllVenues(): string[] {
  const venues = new Set<string>()
  for (const paper of getAllPapers()) {
    venues.add(paper.venue)
  }
  return Array.from(venues).sort()
}

export function getPapersByTag(tag: string): Paper[] {
  return getAllPapers().filter(p => p.tags.includes(tag))
}

export function getPapersByVenue(venue: string): Paper[] {
  return getAllPapers().filter(p => p.venue === venue)
}
