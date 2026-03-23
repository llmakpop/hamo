import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="pt-20 pb-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700 mb-6">
          Built for B2B SaaS
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-6">
          Where B2B marketers meet{' '}
          <span className="text-violet-600">the right voices</span>
        </h1>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
          HAMO connects B2B SaaS marketers with niche influencers, thought leaders, and content creators — and helps creators find brand partnerships that actually fit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/join?type=marketer">
            <Button size="lg" className="w-full sm:w-auto">
              I'm a Marketer
            </Button>
          </Link>
          <Link href="/join?type=influencer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              I'm an Influencer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
