import { ref } from 'vue'
import { useGithubStore } from '@/stores/github'

export function useDropdownFilters() {
  const store = useGithubStore()
  const showDropdown = ref(false)

  const closeDropdown = () => {
    showDropdown.value = false
  }

  return {
    store,
    showDropdown,
    closeDropdown
  }
}
