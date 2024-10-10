<script setup lang="ts">
import { computed } from 'vue'
import RepositoryCard from './RepositoryCard.vue'
import { useGithubStore } from '@/stores/github'
import type { Repository } from '@/types'

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
</script>

<template>
  <div v-if="store.loading" class="text-center p-4">
    <p class="text-lg">Loading repositories...</p>
  </div>

  <div
    v-else-if="store.repositories.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
  >
    <div
      v-for="language in Object.keys(groupedRepositories)"
      :key="language"
      class="bg-white p-4 rounded-lg shadow-md"
    >
      <h3 class="text-lg font-semibold mb-2">
        {{ language }}
      </h3>
      <div class="space-y-4 max-h-96 overflow-y-auto">
        <RepositoryCard
          v-for="repo in groupedRepositories[language]"
          :key="repo.id"
          :repository="repo"
        />
      </div>
    </div>
  </div>

  <div v-else class="bg-white w-100 p-4 rounded-lg shadow text-center">
    <img
      src="@/assets/no-results.jpg"
      height="400"
      width="400"
      alt="No repositories found"
      class="mx-auto mt-4"
    />
    <span class="text-orange-600">
      {{ store.error || 'No repositories found, try changing the filters' }}
    </span>
  </div>
</template>
