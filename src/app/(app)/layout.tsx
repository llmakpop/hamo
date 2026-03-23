import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/join')

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-56 flex-shrink-0 border-r border-slate-200 bg-white lg:flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200">
          <Link href="/dashboard" className="text-xl font-bold text-violet-600 tracking-tight">
            HAMO
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/search">Browse</NavLink>
          <NavLink href="/profile/edit">My Profile</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top nav */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 lg:hidden">
          <Link href="/dashboard" className="text-xl font-bold text-violet-600">HAMO</Link>
          <nav className="flex gap-4 text-sm font-medium text-slate-600">
            <Link href="/dashboard" className="hover:text-violet-600">Home</Link>
            <Link href="/search" className="hover:text-violet-600">Browse</Link>
            <Link href="/profile/edit" className="hover:text-violet-600">Profile</Link>
          </nav>
        </header>

        <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
    >
      {children}
    </Link>
  )
}
