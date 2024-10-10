import type { GithubState, SearchFilters } from '@/types'
import { searchRepositories } from '@/services/githubApi'

type Actions = {
  searchRepositories(): Promise<void>
  selectLanguage(lang: string): void
  removeLanguage(lang: string): void
  setDateRange(start: string, end: string): void
  setMinStars(event: Event): void
  resetFilters(): void
}

export const actions: Actions & ThisType<Actions & GithubState> = {
  async searchRepositories() {
    this.loading = true
    this.error = null
    const filters: SearchFilters = {
      languages: this.selectedLanguages,
      startDate: this.startDate,
      endDate: this.endDate,
      minStars: this.minStars
    }
    try {
      const data = await searchRepositories(filters)
      this.repositories = data.items
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An unknown error occurred'
    } finally {
      this.loading = false
    }
  },

  selectLanguage(lang: string) {
    if (!this.selectedLanguages.includes(lang)) {
      this.selectedLanguages.push(lang)
    }
    this.searchTerm = ''
  },

  removeLanguage(lang: string) {
    this.selectedLanguages = this.selectedLanguages.filter((l) => l !== lang)
  },

  setDateRange(start: string, end: string) {
    this.startDate = start
    this.endDate = end
  },

  setMinStars(event: Event) {
    const stars = (event.target as HTMLInputElement).valueAsNumber
    this.minStars = stars
  },

  resetFilters() {
    this.selectedLanguages = []
    this.startDate = ''
    this.endDate = ''
    this.minStars = 50
    this.searchTerm = ''
  }
}
