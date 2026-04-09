export default function StatCard({ label, value, subtitle }: {
  label: string
  value: string | number
  subtitle?: string
}) {
  return (
    <div className="bg-surface-1 rounded-2xl border border-border-light p-4 sm:p-6">
      <p className="text-2xl sm:text-3xl font-bold text-text-primary">{value}</p>
      <p className="text-xs sm:text-sm text-text-muted mt-1">{label}</p>
      {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
    </div>
  )
}
