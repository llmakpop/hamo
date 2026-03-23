'use client'

import { cn } from '@/lib/utils'

interface MultiSelectProps {
  label?: string
  error?: string
  options: readonly string[] | string[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export function MultiSelect({ label, error, options, value, onChange, className }: MultiSelectProps) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt))
    } else {
      onChange([...value, opt])
    }
  }

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
              value.includes(opt)
                ? 'border-violet-600 bg-violet-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-violet-400 hover:text-violet-700'
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
