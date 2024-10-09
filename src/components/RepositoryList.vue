<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RepositoryCard from './RepositoryCard.vue'
import type { Repository } from '../types'

const props = defineProps<{
  repositories: Repository[]
}>()

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
