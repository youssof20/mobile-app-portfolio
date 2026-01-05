import { fetchRepositories } from '@/lib/github'
import Header from '@/components/Header'
import AppGrid from '@/components/AppGrid'
import ErrorState from '@/components/ErrorState'
import { GitHubRepository } from '@/types/github'

// Configuration - easily editable
const CONFIG = {
  name: 'Your Name',
  tagline: 'Mobile App Developer',
  githubUsername: process.env.GITHUB_USERNAME || '',
  topic: process.env.GITHUB_TOPIC || 'mobile-app',
}

export const revalidate = 3600 // Revalidate every hour (optional, for ISR)

async function getRepositories(): Promise<GitHubRepository[]> {
  const token = process.env.GITHUB_TOKEN
  const username = CONFIG.githubUsername

  if (!token) {
    throw new Error('GITHUB_TOKEN environment variable is required')
  }

  if (!username) {
    throw new Error('GITHUB_USERNAME environment variable is required')
  }

  return fetchRepositories({
    username,
    topic: CONFIG.topic,
    token,
  })
}

export default async function Home() {
  let repositories: GitHubRepository[] = []
  let error: string | null = null

  try {
    repositories = await getRepositories()
  } catch (err) {
    console.error('Failed to fetch repositories:', err)
    error = err instanceof Error ? err.message : 'Unknown error occurred'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header
        name={CONFIG.name}
        tagline={CONFIG.tagline}
        githubUsername={CONFIG.githubUsername}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Mobile Applications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A collection of mobile apps built with modern technologies
          </p>
        </div>
        {error ? (
          <ErrorState message={error} />
        ) : (
          <AppGrid repositories={repositories} />
        )}
      </main>
    </div>
  )
}

