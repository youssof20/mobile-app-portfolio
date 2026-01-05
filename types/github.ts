export interface GitHubRepository {
  name: string
  description: string | null
  url: string
  homepageUrl: string | null
  stargazerCount: number
  primaryLanguage: {
    name: string
    color: string
  } | null
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string
      }
    }>
  }
  updatedAt: string
  isFork?: boolean
  isArchived?: boolean
}

export interface GitHubResponse {
  data: {
    user: {
      repositories: {
        nodes: GitHubRepository[]
      }
    }
  }
}

