interface ErrorStateProps {
  message?: string
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          Unable to Load Repositories
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {message ||
            'Please check your environment variables and GitHub token configuration.'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Check the build logs in Vercel for more details.
        </p>
      </div>
    </div>
  )
}

