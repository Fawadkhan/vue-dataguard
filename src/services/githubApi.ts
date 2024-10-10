import type { SearchFilters, Repository } from '../types'

const BASE_URL = 'https://api.github.com/search/repositories'

interface GithubApiResponse {
  items: Repository[]
  total_count: number
  incomplete_results: boolean
}

export async function searchRepositories(filters: SearchFilters): Promise<GithubApiResponse> {
  const { languages, startDate, endDate, minStars } = filters

  const languageQuery = languages.length > 0 ? languages.join(' OR ') : ''
  const dateFilter = startDate && endDate ? `created:${startDate}..${endDate}` : ''
  const starsFilter = minStars > 0 ? `stars:>=${minStars}` : ''
  const query = [languageQuery, dateFilter, starsFilter].filter(Boolean).join(' ')

  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&sort=stars&order=desc`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch repositories, try again')
  }

  return response.json()
}
