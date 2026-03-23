interface StepCompleteProps {
  email: string
}

export function StepComplete({ email }: StepCompleteProps) {
  return (
    <div className="text-center max-w-md">
      <div className="text-5xl mb-4">📬</div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h2>
      <p className="text-slate-500">
        We've sent a link to <strong>{email}</strong>. Click it to set your password and activate your HAMO profile.
      </p>
      <p className="text-sm text-slate-400 mt-4">
        Didn't get it? Check your spam folder, or contact us at hello@hamo.app
      </p>
    </div>
  )
}
