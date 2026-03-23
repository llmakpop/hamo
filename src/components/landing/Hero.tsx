import Link from 'next/link'

export function Hero() {
  return (
    <section className="pt-24 pb-20 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl mb-5">
          Help a Marketer Out
        </h1>
        <p className="text-xl text-neutral-500 mb-10 leading-relaxed">
          Looking for influencer or co-marketing partnerships to support a campaign or your go-to-market strategy? Share what you're looking for. We'll connect you with relevant people based on expertise and audience alignment.
        </p>
        <Link
          href="/join"
          className="inline-flex items-center justify-center rounded-full bg-violet-600 px-8 py-4 text-base font-medium text-white hover:bg-violet-700 transition-colors"
        >
          Submit what you're looking for
        </Link>
      </div>
    </section>
  )
}
