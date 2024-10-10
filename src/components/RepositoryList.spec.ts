import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RepositoryList from './RepositoryList.vue'
import RepositoryCard from '@/components/RepositoryCard.vue'
import { useGroupedRepositoryList } from '@/composables/useGroupedRepos'
import type { Repository } from '@/types'
import type { ComputedRef } from 'vue'

vi.mock('@/composables/useGroupedRepos')

describe('RepositoryList', () => {
  it('renders loading state correctly', () => {
    vi.mocked(useGroupedRepositoryList).mockReturnValue({
      store: { loading: true, repositories: [], error: null } as unknown as any,
      groupedRepositories: {} as unknown as any
    })
    const wrapper = mount(RepositoryList)
    expect(wrapper.text()).toContain('Loading repositories...')
  })

  it('renders repositories grouped by language', () => {
    vi.mocked(useGroupedRepositoryList).mockReturnValue({
      store: {
        loading: false,
        repositories: [
          { id: 1, name: 'Repo1', language: 'JavaScript' },
          { id: 2, name: 'Repo2', language: 'TypeScript' }
        ] as Repository[],
        error: null
      } as any,
      groupedRepositories: {
        JavaScript: [{ id: 1, name: 'Repo1', language: 'JavaScript' }],
        TypeScript: [{ id: 2, name: 'Repo2', language: 'TypeScript' }]
      } as any
    })
    const wrapper = mount(RepositoryList)
    expect(wrapper.findAll('h3').length).toBe(2)
    expect(wrapper.findAll('h3')[0].text()).toBe('JavaScript')
    expect(wrapper.findAll('h3')[1].text()).toBe('TypeScript')
    expect(wrapper.findAllComponents(RepositoryCard).length).toBe(2)
  })

  it('shows error message when no repositories are found', () => {
    vi.mocked(useGroupedRepositoryList).mockReturnValue({
      store: { loading: false, repositories: [], error: 'API Error' } as any,
      groupedRepositories: {} as any
    })
    const wrapper = mount(RepositoryList)
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('.text-orange-600').text()).toBe('API Error')
  })
})
