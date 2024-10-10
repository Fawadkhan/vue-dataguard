<script setup lang="ts">
import { ref } from 'vue'
import LanguageChip from './LanguageChip.vue'
import { useGithubStore } from '@/stores/github'

const store = useGithubStore()
const showDropdown = ref(false)

const closeDropdown = () => {
  showDropdown.value = false
}
</script>

<template>
  <div class="bg-gray-50 p-4 50vh rounded-lg shadow-md">
    <h2 class="text-xl font-semibold mb-4">Filters</h2>
    <div class="mb-4 relative">
      <LanguageChip :selectedLanguages="store.selectedLanguages" @remove="store.removeLanguage" />
      <input
        v-model="store.searchTerm"
        @focus="showDropdown = true"
        @blur="closeDropdown"
        placeholder="Search language..."
        class="w-full p-2 border rounded"
      />
      <ul
        v-if="showDropdown && store.filteredLanguages.length"
        class="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="lang in store.filteredLanguages"
          :key="lang"
          @mousedown="store.selectLanguage(lang)"
          class="p-2 hover:bg-gray-200 cursor-pointer"
        >
          {{ lang }}
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <label class="block mb-2">From</label>
      <input
        v-model="store.startDate"
        type="date"
        class="w-full p-2 border rounded"
        @change="store.setDateRange(store.startDate, store.endDate)"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-2">To</label>
      <input
        v-model="store.endDate"
        type="date"
        class="w-full p-2 border rounded"
        @change="store.setDateRange(store.startDate, store.endDate)"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-2">Filter stars</label>
      <input
        v-model.number="store.minStars"
        type="number"
        class="w-full p-2 border rounded"
        placeholder="100"
        @input="store.setMinStars($event)"
      />
    </div>
    <button
      @click="store.searchRepositories"
      class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
      Search selected filters
    </button>
  </div>
</template>
