<template>
  <div class="bg-gray-100 p-4 rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Filters</h2>
    <div class="mb-4 relative">
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
      <input
        v-model="searchTerm"
        @input="filterLanguages"
        @focus="showDropdown = true"
        @blur="closeDropdown"
        placeholder="Search language..."
        class="w-full p-2 border rounded"
      />
      <ul
        v-if="showDropdown && filteredLanguages.length"
        class="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="lang in filteredLanguages"
          :key="lang"
          @mousedown="selectLanguage(lang)"
          class="p-2 hover:bg-gray-200 cursor-pointer"
        >
          {{ lang }}
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <label class="block mb-2">From</label>
      <input v-model="startDate" type="date" class="w-full p-2 border rounded" />
    </div>
    <div class="mb-4">
      <label class="block mb-2">To</label>
      <input v-model="endDate" type="date" class="w-full p-2 border rounded" />
    </div>
    <div class="mb-4">
      <label class="block mb-2">Filter stars</label>
      <input
        v-model.number="minStars"
        type="number"
        class="w-full p-2 border rounded"
        placeholder="100"
      />
    </div>
    <button @click="search" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
      Search selected filters
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SearchFilters } from '../types'

const emit = defineEmits<{
  (e: 'search', filters: SearchFilters): void
}>()

const languages: string[] = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'Go', 'Ruby']
const searchTerm = ref('')
const selectedLanguages = ref<string[]>([])
const startDate = ref('')
const endDate = ref('')
const minStars = ref(100)
const showDropdown = ref(false)

const filteredLanguages = computed(() => {
  return languages.filter(
    (lang) =>
      lang.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
      !selectedLanguages.value.includes(lang)
  )
})

const selectLanguage = (lang: string) => {
  if (!selectedLanguages.value.includes(lang)) {
    selectedLanguages.value.push(lang)
  }
  searchTerm.value = ''
  showDropdown.value = false
}

const removeLanguage = (lang: string) => {
  selectedLanguages.value = selectedLanguages.value.filter((l) => l !== lang)
}

const filterLanguages = () => {
  showDropdown.value = true
}

const closeDropdown = () => {
  showDropdown.value = false
}

const search = () => {
  emit('search', {
    languages: selectedLanguages.value,
    startDate: startDate.value,
    endDate: endDate.value,
    minStars: minStars.value
  })
}
</script>
