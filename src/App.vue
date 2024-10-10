<script setup lang="ts">
import { ref } from 'vue'
import FilterSection from '@/components/FilterSection.vue'
import RepositoryList from '@/components/RepositoryList.vue'
import { useGithubStore } from '@/stores/githubRepoStore'
import type { Repository, SearchFilters } from '@/types'

const githubStore = useGithubStore()
const repositories = ref<Repository[]>([])

const performSearch = async (filters: SearchFilters) => {
  repositories.value = await githubStore.searchRepositories(filters)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">GitHub Repository Search</h1>
    <div class="md:flex w-100 gap-2">
      <FilterSection class="w-100 md:w-1/4 pr-4 pb-2" @search="performSearch" />
      <RepositoryList class="md:w-3/4" :repositories="repositories" />
    </div>
  </div>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
