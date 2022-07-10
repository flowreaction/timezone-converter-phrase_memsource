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

    it.todo('focuses the input field on modal open', () => {
        wrapper.get('[data]')
    })

    it.todo('renders "No recent searches" on initial render with empty recent searches')
    it.todo('renders the search results on input change')
    it.todo('adds selected city to recent/selected cities on click')
    it.todo('closes modal on click outside')
    it.todo('closes modal on click on cancel button')
})

describe('Search Modal keypress navigation features', () => {
    it.todo('selects first result on default')
    it.todo('selects next result on keypress down')
    it.todo('selects previous result on keypress up')
    it.todo('closes modal on esc keypress')
})
