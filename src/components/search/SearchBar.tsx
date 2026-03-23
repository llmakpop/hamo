'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  defaultValue?: string
  size?: 'default' | 'hero'
}

export function SearchBar({ defaultValue = '', size = 'default' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find fintech influencers in Europe with LinkedIn presence..."
        className={`flex-1 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 transition-colors focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${
          size === 'hero' ? 'px-5 py-4 text-base' : 'px-4 py-2.5 text-sm'
        }`}
      />
      <button
        type="submit"
        className={`flex-shrink-0 rounded-xl bg-violet-600 font-medium text-white hover:bg-violet-700 transition-colors ${
          size === 'hero' ? 'px-6 py-4 text-base' : 'px-4 py-2.5 text-sm'
        }`}
      >
        Search
      </button>
    </form>
  )
}
