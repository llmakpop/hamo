import Link from 'next/link'

interface StepCompleteProps {
  email: string
}

export function StepComplete({ email }: StepCompleteProps) {
  return (
    <div className="max-w-md">
      <h2 className="text-3xl font-semibold text-neutral-900 mb-4">You're in.</h2>
      <p className="text-neutral-500 leading-relaxed mb-6">
        We'll use your submission to match you with relevant influencer and co-marketing opportunities based on expertise and audience alignment. When there's a strong fit, we'll reach out with potential matches.
      </p>
      <p className="text-sm text-neutral-400 mb-8">
        A link to finish your profile has been sent to <span className="text-neutral-600">{email}</span>.
      </p>
      <Link
        href="/join"
        className="text-sm text-violet-600 hover:underline"
      >
        Submit another opportunity →
      </Link>
    </div>
  )
}
