import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <Link href="/" className="text-xl font-bold text-violet-600 tracking-tight">
          HAMO
        </Link>
      </header>
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-6 py-12">
        {children}
      </main>
    </div>
  )
}
