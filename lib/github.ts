import { GitHubRepository } from '@/types/github'

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'

interface GitHubConfig {
  username: string
  topic: string
  token: string
}

export async function fetchRepositories(
  config: GitHubConfig
): Promise<GitHubRepository[]> {
  const { username, topic, token } = config

  const query = `
    query GetRepositories($username: String!, $topic: String!) {
      user(login: $username) {
        repositories(
          first: 100
          orderBy: { field: UPDATED_AT, direction: DESC }
          ownerAffiliations: OWNER
        ) {
          nodes {
            name
            description
            url
            homepageUrl
            stargazerCount
            primaryLanguage {
              name
              color
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
            updatedAt
            isFork
            isArchived
          }
        }
      }
    }
  `

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username, topic },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
    }

    const repositories: GitHubRepository[] =
      data.data?.user?.repositories?.nodes || []

    // Filter repositories
    const filtered = repositories.filter((repo) => {
      // Exclude forks and archived repos
      if (repo.isFork === true || repo.isArchived === true) {
        return false
      }

      // Check if repo has the required topic
      const topics = repo.repositoryTopics.nodes.map((node) => node.topic.name)
      return topics.includes(topic)
    })

    // Sort: featured first (if topic exists), then by updatedAt, then by stars
    const hasFeaturedTopic = (repo: GitHubRepository) => {
      const topics = repo.repositoryTopics.nodes.map((node) => node.topic.name)
      return topics.includes('featured')
    }

    filtered.sort((a, b) => {
      const aFeatured = hasFeaturedTopic(a)
      const bFeatured = hasFeaturedTopic(b)

      // Featured repos float to the top
      if (aFeatured && !bFeatured) return -1
      if (!aFeatured && bFeatured) return 1

      // Then by most recently updated
      const dateA = new Date(a.updatedAt).getTime()
      const dateB = new Date(b.updatedAt).getTime()
      if (dateA !== dateB) {
        return dateB - dateA
      }

      // Finally by star count
      return b.stargazerCount - a.stargazerCount
    })

    return filtered
  } catch (error) {
    console.error('Error fetching repositories:', error)
    throw error
  }
}

