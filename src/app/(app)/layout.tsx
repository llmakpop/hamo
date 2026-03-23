import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/join')

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden w-48 flex-shrink-0 border-r border-neutral-100 bg-white lg:flex flex-col">
        <div className="px-5 py-5">
          <Link href="/dashboard" className="text-base font-semibold text-neutral-900 tracking-tight">
            HAMO
          </Link>
        </div>
        <nav className="flex-1 px-2 py-2 flex flex-col gap-0.5">
          <NavLink href="/dashboard">Home</NavLink>
          <NavLink href="/search">Browse</NavLink>
          <NavLink href="/profile/edit">My Profile</NavLink>
          <NavLink href="/settings">Settings</NavLink>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile top nav */}
        <header className="flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4 lg:hidden">
          <Link href="/dashboard" className="text-base font-semibold text-neutral-900">HAMO</Link>
          <nav className="flex gap-4 text-sm text-neutral-500">
            <Link href="/dashboard" className="hover:text-neutral-900 transition-colors">Home</Link>
            <Link href="/search" className="hover:text-neutral-900 transition-colors">Browse</Link>
            <Link href="/profile/edit" className="hover:text-neutral-900 transition-colors">Profile</Link>
          </nav>
        </header>

        <main className="flex-1 px-10 py-6 max-w-4xl w-full">
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
      className="rounded-md px-3 py-1.5 text-sm text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
    >
      {children}
    </Link>
  )
}
