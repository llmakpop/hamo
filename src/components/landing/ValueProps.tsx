const MARKETER_PROPS = [
  'Find influencers by niche, region, platform, and audience size',
  'Filter by industry and funding-stage fit',
  'No bloated agency middlemen',
]

const INFLUENCER_PROPS = [
  'Get discovered by B2B SaaS brands that match your niche',
  'See what companies are actively looking for',
  'Build your presence on a platform built for B2B',
]

export function ValueProps() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-12 sm:grid-cols-2">
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-8">
          <div className="text-3xl mb-4">📣</div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">For Marketers</h3>
          <ul className="flex flex-col gap-3">
            {MARKETER_PROPS.map((prop) => (
              <li key={prop} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-violet-600 font-bold">✓</span>
                {prop}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <div className="text-3xl mb-4">🎤</div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">For Influencers</h3>
          <ul className="flex flex-col gap-3">
            {INFLUENCER_PROPS.map((prop) => (
              <li key={prop} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-violet-600 font-bold">✓</span>
                {prop}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
