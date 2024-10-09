import type { SearchFilters, Repository } from '../types'

const BASE_URL = 'https://api.github.com/search/repositories'

interface GithubApiResponse {
  items: Repository[]
  total_count: number
  incomplete_results: boolean
}

export async function searchRepositories(filters: SearchFilters): Promise<GithubApiResponse> {
  const { languages, startDate, endDate, minStars } = filters
  const query = `${languages.join(' OR ')} created:${startDate}..${endDate} stars:>=${minStars}`
  const url = `${BASE_URL}?q=${encodeURIComponent(query)}&sort=stars&order=desc`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Something happened to the request, please try again')
  }
  return response.json()
}
