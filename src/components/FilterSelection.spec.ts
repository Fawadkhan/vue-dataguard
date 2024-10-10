import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterSelection from '@/components/FilterSelection.vue'
import LanguageChip from '@/components/LabelChip.vue'

const mockStore = {
  selectedLanguages: ['JavaScript', 'TypeScript'],
  searchTerm: '',
  filteredLanguages: ['Python', 'Java'],
  startDate: '',
  endDate: '',
  minStars: 50,
  removeLanguage: vi.fn(),
  selectLanguage: vi.fn(),
  setDateRange: vi.fn(),
  setMinStars: vi.fn(),
  searchRepositories: vi.fn()
}

vi.mock('@/composables/useDropdownFilter', () => ({
  useDropdownFilters: () => ({
    store: mockStore,
    showDropdown: false,
    closeDropdown: vi.fn()
  })
}))

describe('FilterSelection', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(FilterSelection, {
      global: {
        stubs: {
          LanguageChip: true
        }
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Filters')
    expect(wrapper.find('input[placeholder="Search language..."]').exists()).toBe(true)
    expect(wrapper.find('input[type="date"]').exists()).toBe(true)
    expect(wrapper.find('input[type="number"]').exists()).toBe(true)
    expect(wrapper.find('button').text()).toBe('Search selected filters')
  })

  it('renders LanguageChip component with correct props', () => {
    const languageChip = wrapper.findComponent(LanguageChip)
    expect(languageChip.exists()).toBe(true)
    expect(languageChip.props('labels')).toEqual(mockStore.selectedLanguages)
  })

  it('shows dropdown when input is focused', async () => {
    const input = wrapper.find('input[placeholder="Search language..."]')
    await input.trigger('focus')
    expect(wrapper.vm.showDropdown).toBe(true)
  })

  it('updates date range when dates are changed', async () => {
    const startDateInput = wrapper.find('input[type="date"]')
    await startDateInput.setValue('2023-01-01')
    expect(mockStore.setDateRange).toHaveBeenCalled()
  })

  it('updates minimum stars when input changes', async () => {
    const minStarsInput = wrapper.find('input[type="number"]')
    await minStarsInput.setValue(100)
    expect(mockStore.setMinStars).toHaveBeenCalled()
  })

  it('calls searchRepositories when search button is clicked', async () => {
    const searchButton = wrapper.find('button')
    await searchButton.trigger('click')
    expect(mockStore.searchRepositories).toHaveBeenCalled()
  })
})
