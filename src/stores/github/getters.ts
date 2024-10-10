import { LANGUAGES } from './constants'
import type { GithubState } from '@/types'

export const getters = {
  filteredLanguages: (state: GithubState) => {
    const languages = LANGUAGES
    return languages.filter(
      (lang) =>
        lang.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
        !state.selectedLanguages.includes(lang)
    )
  }
}
