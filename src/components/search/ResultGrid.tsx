import { Profile } from '@/lib/types'
import { ResultCard } from './ResultCard'

interface ResultGridProps {
  profiles: Partial<Profile>[]
  loading?: boolean
}

export function ResultGrid({ profiles, loading }: ResultGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
            <div className="h-3 bg-slate-100 rounded w-1/3 mb-4" />
            <div className="h-3 bg-slate-100 rounded w-full mb-2" />
            <div className="h-3 bg-slate-100 rounded w-5/6" />
          </div>
        ))}
      </div>
    )
  }

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-slate-600 font-medium">No results found</p>
        <p className="text-slate-400 text-sm mt-1">Try broadening your search or removing some filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {profiles.map((profile) => (
        <ResultCard key={profile.id} profile={profile as any} />
      ))}
    </div>
  )
}
