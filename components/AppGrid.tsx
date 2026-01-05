'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { GitHubRepository } from '@/types/github'
import AppCard from './AppCard'
import SearchBar from './SearchBar'

interface AppGridProps {
  repositories: GitHubRepository[]
}

export default function AppGrid({ repositories }: AppGridProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Configure Fuse.js for search
  const fuse = useMemo(
    () =>
      new Fuse(repositories, {
        keys: ['name', 'description', 'primaryLanguage.name'],
        threshold: 0.3, // 0.0 = perfect match, 1.0 = match anything
        ignoreLocation: true,
      }),
    [repositories]
  )

  // Filter repositories based on search query
  const filteredRepositories = useMemo(() => {
    if (!searchQuery.trim()) {
      return repositories
    }

    const results = fuse.search(searchQuery)
    return results.map((result) => result.item)
  }, [searchQuery, fuse, repositories])

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No repositories found. Make sure you have public repositories tagged
          with &quot;mobile-app&quot; on GitHub.
        </p>
      </div>
    )
  }

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        resultCount={filteredRepositories.length}
        totalCount={repositories.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepositories.map((repo) => (
          <AppCard key={repo.url} repository={repo} />
        ))}
      </div>
      {filteredRepositories.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No apps found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </>
  )
}

