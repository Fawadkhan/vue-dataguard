import type { SearchFilters, Repository } from '../types'

const BASE_URL = 'https://api.github.com/search/repositories'

interface GithubApiResponse {
  items: Repository[]
  total_count: number
  incomplete_results: boolean
}

export async function searchRepositories(filters: SearchFilters): Promise<GithubApiResponse> {
  const query = constructFilterQuery(filters)

  const searchRepositoryUrl = `${BASE_URL}?q=${encodeURIComponent(query)}&sort=stars&order=desc`

  const response = await fetch(searchRepositoryUrl)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Failed to fetch repositories')
  }
  return response.json()
}

function constructFilterQuery(filters: SearchFilters): string {
  const { languages, startDate, endDate, minStars } = filters

  const languageQuery = languages.map((lang) => `language:${lang}`).join(' ')
  const dateFilter = startDate && endDate ? `created:${startDate}..${endDate}` : ''
  const starsFilter = minStars > 0 ? `stars:>=${minStars}` : ''

  const queryParts = [languageQuery, dateFilter, starsFilter].filter(Boolean)
  return queryParts.join(' ')
}
