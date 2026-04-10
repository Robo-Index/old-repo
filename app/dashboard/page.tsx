import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import type { Metadata } from 'next'
import DashboardClient from '@/components/dashboard/DashboardClient'
import SubmissionTimeline from '@/components/dashboard/SubmissionTimeline'

export const metadata: Metadata = {
  title: 'Dashboard | RoboIndex',
}

function loadTimeline() {
  const filePath = path.join(process.cwd(), 'src/content/timeline.yaml')
  if (!fs.existsSync(filePath)) return null
  const content = fs.readFileSync(filePath, 'utf-8')
  return yaml.parse(content)
}

export default function DashboardPage() {
  const timeline = loadTimeline()

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Dashboard
        </h1>
        <p className="mt-2 text-text-secondary">
          Research trends, topic distribution, and tag analytics
        </p>
      </div>
      <DashboardClient />

      {timeline && (
        <div className="mt-12 bg-surface-1 rounded-2xl border border-border-light p-6">
          <SubmissionTimeline stages={timeline.stages} />
        </div>
      )}
    </main>
  )
}
