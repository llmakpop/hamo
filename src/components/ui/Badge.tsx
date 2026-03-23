import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'violet' | 'blue' | 'green' | 'amber'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-slate-100 text-slate-700': variant === 'default',
          'bg-violet-100 text-violet-700': variant === 'violet',
          'bg-blue-100 text-blue-700': variant === 'blue',
          'bg-green-100 text-green-700': variant === 'green',
          'bg-amber-100 text-amber-700': variant === 'amber',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
