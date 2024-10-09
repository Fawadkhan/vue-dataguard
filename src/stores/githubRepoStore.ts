import { defineStore } from 'pinia'
import { searchRepositories } from '../services/githubApi'
import type { Repository, SearchFilters } from '../types'

interface GithubState {
  repositories: Repository[]
  loading: boolean
  error: string | null
}

export const useGithubStore = defineStore('github', {
  state: (): GithubState => ({
    repositories: [],
    loading: false,
    error: null
  }),
  actions: {
    async searchRepositories(filters: SearchFilters) {
      this.loading = true
      this.error = null
      try {
        const data = await searchRepositories(filters)
        this.repositories = data.items
        return this.repositories
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An unknown error occurred'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
