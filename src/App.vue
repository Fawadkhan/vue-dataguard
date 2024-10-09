<template>
  <div class="w-100 mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">GitHub Repository Search</h1>
    <div class="flex">
      <FilterSection class="w-1/4 pr-4" @search="performSearch" />
      <RepositoryList class="w-3/4" :repositories="repositories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FilterSection from '@/components/FilterSection.vue'
import RepositoryList from '@/components/RepositoryList.vue'
import type { Repository, SearchFilters } from '@/types'

const repositories = ref<Repository[]>([])

const performSearch = async (filters: SearchFilters) => {
  console.log('filters', filters)
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
