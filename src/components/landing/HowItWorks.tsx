const STEPS = [
  {
    icon: '✍️',
    title: 'Create your profile',
    description:
      'Fill out a quick form — we ask only what matters. Marketers share what they\'re building; influencers share their audience and niche.',
  },
  {
    icon: '🔍',
    title: 'Search in plain English',
    description:
      'Type what you\'re looking for — "fintech influencers in Europe" or "Series A devtools companies" — and get matched results instantly.',
  },
  {
    icon: '🤝',
    title: 'Connect and collaborate',
    description:
      'Reach out directly. No gatekeeping, no bidding wars — just real conversations between the right people.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">How it works</h2>
        <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">
          HAMO keeps it simple. No algorithms gaming the feed, no hidden fees.
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
