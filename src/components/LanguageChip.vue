<template>
  <div class="mb-4 flex flex-wrap gap-2">
    <span
      v-for="lang in selectedLanguages"
      :key="lang"
      class="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
    >
      {{ lang }}
      <button @click="removeLanguage(lang)" class="ml-1 text-blue-600 hover:text-blue-800">
        &times;
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  selectedLanguages: string[]
}>()

const emit = defineEmits<{
  (e: 'remove', lang: string): void
}>()

const removeLanguage = (lang: string) => {
  emit('remove', lang)
}
</script>
