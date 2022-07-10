import { mount } from '@vue/test-utils'

import { mockCities } from '~stores/mockCities'
import SearchModalItem from './SearchModalItem.vue'

const testCityHamburg = mockCities[0]

describe('SearchModalItem', () => {
    it('Renders the City and Country', () => {
        const wrapper = mount(SearchModalItem, {
            props: {
                entry: testCityHamburg,
            },
        })

        expect(wrapper.get('[data-testid="city"]').text()).toBe(testCityHamburg.city)
        expect(wrapper.get('[data-testid="country"]').text()).toBe(`(${testCityHamburg.country})`)
    })

    it('Renders the check icon on display.added property is true', () => {
        const wrapper = mount(SearchModalItem, {
            props: {
                entry: {
                    ...testCityHamburg,
                    display: {
                        added: true, // added to the list sets this to true
                    },
                },
            },
        })

        expect(wrapper.find('[data-testid="check-icon"]').exists()).toBe(true)
        expect(wrapper.find('[data-testid="add-icon"]').exists()).toBe(false)
    })
    it('Renders the add-to-list icon when display.highlighted propterty is true', () => {
        const wrapper = mount(SearchModalItem, {
            props: {
                entry: {
                    ...testCityHamburg,
                    display: {
                        highlighted: true, // selected with keyboard
                    },
                },
            },
        })

        expect(wrapper.find('[data-testid="check-icon"]').exists()).toBe(false)
        expect(wrapper.find('[data-testid="add-icon"]').exists()).toBe(true)
    })
})
