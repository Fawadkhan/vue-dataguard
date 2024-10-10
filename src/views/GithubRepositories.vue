<script setup lang="ts">
import FilterSection from '@/components/FilterSection.vue'
import RepositoryList from '@/components/RepositoryList.vue'
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">GitHub Repository Search</h1>
    <div class="md:flex w-100 gap-2">
      <FilterSection class="relative w-100 md:w-1/4 pr-4 pb-2 h-full" />
      <RepositoryList class="md:w-3/4" />
    </div>
  </div>
</template>
