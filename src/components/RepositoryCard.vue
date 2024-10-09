<template>
  <div class="border p-4 rounded-lg">
    <h4 class="font-semibold mb-2">
      <a :href="repository.html_url" target="_blank" class="text-blue-600 hover:underline">{{
        repository.name
      }}</a>
    </h4>
    <p class="text-sm text-gray-600 mb-2">{{ repository.description }}</p>
    <div class="text-sm text-gray-500">
      <p>Created on: {{ new Date(repository.created_at).toLocaleDateString() }}</p>
      <p>Stars: {{ repository.stargazers_count }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Repository } from '@/types'

defineProps<{
  repository: Repository
}>()
</script>
