interface ErrorFallbackProps {
  error: Error | null
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="rounded-lg bg-red-50 p-8 text-center">
        <h2 className="mb-4 font-bold text-2xl text-red-600">
          예상치 못한 오류가 발생했습니다
        </h2>
        <div className="mb-4 rounded bg-red-100 p-4 text-left font-mono text-red-800 text-sm">
          {error?.message}
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          페이지 새로고침
        </button>
      </div>
    </div>
  )
}
