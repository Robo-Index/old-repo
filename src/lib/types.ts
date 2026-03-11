export interface Paper {
  slug: string
  title: string
  venue: string
  year: number
  authors: string[]
  abstract: string
  tags: string[]
  repo?: string
  project_page?: string
  arxiv?: string
  pdf?: string
  preview_image?: string
  preview_video?: string
  date_added: string
}

export interface PaperIndex {
  data: Paper[]
  meta: { count: number; generated_at: string }
}

export interface Stats {
  total_papers: number
  papers_with_repo: number
  venues: Record<string, number>
  years: Record<number, number>
  tags: Record<string, number>
  generated_at: string
}
