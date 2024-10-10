import type { GithubState } from '@/types'

export const state = (): GithubState => ({
  repositories: [],
  loading: false,
  error: null,
  selectedLanguages: [],
  startDate: '',
  endDate: '',
  minStars: 50,
  searchTerm: ''
})
