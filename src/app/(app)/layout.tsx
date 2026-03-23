import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/join')

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky top nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="text-base font-semibold text-violet-600 tracking-tight">
            HAMO
          </Link>
          <nav className="flex items-center gap-1">
            <NavLink href="/dashboard">Home</NavLink>
            <NavLink href="/search">Browse</NavLink>
            <NavLink href="/profile/edit">My Profile</NavLink>
            <NavLink href="/settings">Settings</NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-8">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
    >
      {children}
    </Link>
  )
}
