import fs from 'fs'
import path from 'path'
import type { RepoMeta, RepoMetaIndex } from './types'

const REPOS_PATH = path.join(process.cwd(), 'data/repos.json')

function normalizeUrl(url: string): string {
  return url.toLowerCase().replace(/\/$/, '')
}

export function getRepoMetaMap(): Record<string, RepoMeta> {
  if (!fs.existsSync(REPOS_PATH)) return {}
  const raw = fs.readFileSync(REPOS_PATH, 'utf-8')
  const index: RepoMetaIndex = JSON.parse(raw)
  return index.data
}

export function getRepoMeta(repoUrl: string): RepoMeta | undefined {
  const map = getRepoMetaMap()
  return map[normalizeUrl(repoUrl)]
}
