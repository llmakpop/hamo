const USE_CASES = [
  'Find influencers with the right audience',
  'Source co-marketing partners with aligned positioning',
  'Collaborate on content, events, or distribution',
  'Build ecosystem relationships',
]

export function ValueProps() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4 leading-snug">
              Built for marketers who know what they need
            </h2>
            <p className="text-neutral-500 text-base leading-relaxed">
              HAMO isn't a marketplace with fees or a bloated platform to manage. It's a simple, fast way to surface the right partnerships — by sharing exactly what you're looking for.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {USE_CASES.map((uc) => (
              <li key={uc} className="flex items-start gap-3 text-sm text-neutral-700">
                <span className="mt-0.5 text-violet-500 font-bold flex-shrink-0">→</span>
                {uc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
