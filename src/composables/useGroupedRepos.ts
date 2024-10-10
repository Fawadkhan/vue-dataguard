import { computed } from 'vue'
import { useGithubStore } from '@/stores/github'
import type { Repository } from '@/types'

export function useGroupedRepositoryList() {
  const store = useGithubStore()

  const groupedRepositories = computed(() => {
    return store.repositories.reduce((acc: Record<string, Repository[]>, repo: Repository) => {
      if (!acc[repo.language]) {
        acc[repo.language] = []
      }
      acc[repo.language].push(repo)
      return acc
    }, {})
  })

  return {
    store,
    groupedRepositories
  }
}
