import Link from 'next/link'

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-violet-600 tracking-tight">
            HAMO
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/join"
              className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700 transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 py-8 px-6 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} HAMO — Help A Marketer Out
      </footer>
    </>
  )
}
