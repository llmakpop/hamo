const STEPS = [
  {
    num: '01',
    title: 'Share what you\'re looking for',
    description: 'Tell us about the opportunity — who you want to reach, what kind of collaboration, and what expertise or perspective matters.',
  },
  {
    num: '02',
    title: 'Get matched based on expertise and audience alignment',
    description: 'We use your submission to find relevant influencers, co-marketing partners, and collaborators who are the right fit.',
  },
  {
    num: '03',
    title: 'Collaborate and go to market together',
    description: 'When there\'s a strong fit, we make the introduction. You take it from there — content, events, co-sell, distribution, or whatever makes sense.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-neutral-900 text-center mb-16">How it works</h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="flex flex-col">
              <span className="text-xs font-semibold text-violet-500 tracking-widest mb-3">{step.num}</span>
              <h3 className="font-semibold text-neutral-900 mb-2 leading-snug">{step.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
