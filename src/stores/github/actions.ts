import type { SearchFilters } from '@/types'
import { searchRepositories } from '../../services/githubApi'

export const actions = {
  async searchRepositories(this: any) {
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
      return (this.repositories = data.items)
    } catch (error) {
      this.error = error instanceof Error ? error.message : 'An unknown error occurred'
    } finally {
      this.loading = false
    }
  },
  selectLanguage(this: any, lang: string) {
    if (!this.selectedLanguages.includes(lang)) {
      this.selectedLanguages.push(lang)
    }
    this.searchTerm = ''
  },
  removeLanguage(this: any, lang: string) {
    this.selectedLanguages = this.selectedLanguages.filter((l: string) => l !== lang)
  },
  setDateRange(this: any, start: string, end: string) {
    this.startDate = start
    this.endDate = end
  },
  setMinStars(this: any, event: Event) {
    const stars = (event.target as HTMLInputElement).valueAsNumber
    this.minStars = stars
  },
  resetFilters(this: any) {
    this.selectedLanguages = []
    this.startDate = ''
    this.endDate = ''
    this.minStars = 50
    this.searchTerm = ''
  }
}
