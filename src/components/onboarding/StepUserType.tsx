'use client'

import { UserType } from '@/lib/types'

interface StepUserTypeProps {
  onSelect: (type: UserType) => void
}

export function StepUserType({ onSelect }: StepUserTypeProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to HAMO</h2>
      <p className="text-slate-600 mb-8">Let's set up your profile. First — who are you?</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={() => onSelect('marketer')}
          className="group rounded-xl border-2 border-slate-200 p-6 text-left transition-all hover:border-violet-400 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <div className="mb-3 text-3xl">📣</div>
          <h3 className="font-semibold text-slate-900 group-hover:text-violet-700">I'm a Marketer</h3>
          <p className="mt-1 text-sm text-slate-500">
            I work at a B2B SaaS company and want to find influencers to collaborate with.
          </p>
        </button>

        <button
          onClick={() => onSelect('influencer')}
          className="group rounded-xl border-2 border-slate-200 p-6 text-left transition-all hover:border-violet-400 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <div className="mb-3 text-3xl">🎤</div>
          <h3 className="font-semibold text-slate-900 group-hover:text-violet-700">I'm an Influencer</h3>
          <p className="mt-1 text-sm text-slate-500">
            I create content for a B2B SaaS audience and want to find brand opportunities.
          </p>
        </button>
      </div>
    </div>
  )
}
