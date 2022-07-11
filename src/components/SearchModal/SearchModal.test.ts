import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { mockCities } from '~stores/mockCities'
import { useCityStore } from '~stores/useCityStore'
import SearchModal from './SearchModal.vue'

describe('SearchModal search features', () => {
    const wrapper = mount(SearchModal, {
        global: {
            stubs: {
                teleport: true,
            },
            plugins: [
                createTestingPinia({
                    initialState: {
                        cityStore: {
                            cities: mockCities,
                            selectedCities: [],
                            recentSearches: [],
                        },
                    },
                }),
            ],
        },
    })

    const store = useCityStore()

    it('renders the search modal on search-button click', async () => {
        await wrapper.get('[data-testid="search-button"]').trigger('click')

        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(true)
    })

    it('renders "No recent searches" on initial render with empty recent searches', async () => {
        expect(wrapper.html()).toContain('No recent searches')
    })

    it('renders the search results on input change', async () => {
        // const results = wrapper.get('[data-testid="search-results"]')
        const input = wrapper.get('[data-testid="search-input"]')

        await input.setValue('London')
        expect(wrapper.find('[data-testid="search-results"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="search-results"]').text()).toContain('London')
    })

    it('adds selected city to recent/selected cities on click', async () => {
        const result = wrapper.find('[data-testid="single-search-result"]')

        expect(result.exists()).toBe(true)
        await result.trigger('click')

        expect(store.addToSelectedCities).toHaveBeenCalled()
    })

    it('closes modal on click on cancel button', async () => {
        const cancelButton = wrapper.get('[data-testid="close-modal-button"]')

        await cancelButton.trigger('click')

        expect(wrapper.find('[data-testid="modal"]').exists()).toBe(false)
    })
})
