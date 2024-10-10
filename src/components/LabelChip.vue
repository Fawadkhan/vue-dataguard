<template>
  <div class="mb-4 flex flex-wrap gap-2">
    <span
      v-for="item in labels"
      :key="item"
      class="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
    >
      {{ item }}
      <button @click="removeLabelChip(item)" class="ml-1 text-blue-600 hover:text-blue-800">
        &times;
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  labels: string[]
}>()

const emit = defineEmits<{
  (e: 'remove', item: string): void
}>()

const removeLabelChip = (item: string) => {
  emit('remove', item)
}
</script>
