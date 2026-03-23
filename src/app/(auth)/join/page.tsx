import { OnboardingShell } from '@/components/onboarding/OnboardingShell'
import { UserType } from '@/lib/types'

interface JoinPageProps {
  searchParams: Promise<{ type?: string; error?: string }>
}

export default async function JoinPage({ searchParams }: JoinPageProps) {
  const params = await searchParams
  const initialType = params.type === 'marketer' || params.type === 'influencer'
    ? (params.type as UserType)
    : undefined

  return (
    <div className="w-full max-w-lg">
      {params.error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          Something went wrong with your signup link. Please try again.
        </div>
      )}
      <OnboardingShell initialType={initialType} />
    </div>
  )
}
