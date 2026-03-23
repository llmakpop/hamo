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
        className={`flex-1 rounded-xl border bg-white text-neutral-900 placeholder-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900/10 ${
          size === 'hero'
            ? 'border-neutral-200 px-5 py-4 text-base focus:border-neutral-400'
            : 'border-neutral-200 px-4 py-2.5 text-sm focus:border-neutral-400'
        }`}
      />
      <button
        type="submit"
        className={`flex-shrink-0 rounded-xl bg-neutral-900 font-medium text-white hover:bg-neutral-700 transition-colors ${
          size === 'hero' ? 'px-6 py-4 text-base' : 'px-4 py-2.5 text-sm'
        }`}
      >
        Search
      </button>
    </form>
  )
}
