export interface Repository {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string
  created_at: string
  stargazers_count: number
  language: string
}

export interface SearchFilters {
  languages: string[]
  startDate: string
  endDate: string
  minStars: number
}

export interface GithubState {
  repositories: Repository[]
  loading: boolean
  error: string | null
  selectedLanguages: string[]
  startDate: string
  endDate: string
  minStars: number
  searchTerm: string
}
