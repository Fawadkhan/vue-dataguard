<template>
  <div v-if="repositories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="language in Object.keys(groupedRepositories)"
      :key="language"
      class="bg-white p-4 rounded-lg shadow"
    >
      <h3 class="text-lg font-semibold mb-2">{{ language }}</h3>
      <div class="space-y-4 max-h-96 overflow-y-auto">
        <RepositoryCard
          v-for="repo in groupedRepositories[language]"
          :key="repo.id"
          :repository="repo"
        />
      </div>
    </div>
  </div>
  <div v-else class="bg-white w-100 md:h-100 p-4 rounded-lg shadow text-center text-gray-500">
    {{ githubStore.error ? githubStore.error : ' No repositories found, try changing the filters' }}
    <img
      src="../assets/no-results.jpg"
      height="400"
      width="400"
      alt="No repositories found"
      class="mx-auto mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RepositoryCard from './RepositoryCard.vue'
import type { Repository } from '../types'
import { useGithubStore } from '../stores/githubRepoStore'

const props = defineProps<{
  repositories: Repository[]
}>()

const githubStore = useGithubStore()

console.log('groupedRepositories', props.repositories)
const groupedRepositories = computed(() => {
  return props.repositories.reduce((acc: Record<string, Repository[]>, repo) => {
    if (!acc[repo.language]) {
      acc[repo.language] = []
    }
    acc[repo.language].push(repo)
    return acc
  }, {})
})
</script>
