import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import TimeZoneListElement from './TimeZoneListElement.vue'
import { useCityStore } from '~stores/useCityStore'
import { CityDisplay } from '~types'

const cities: CityDisplay[] = [
    {
        city: 'Hamburg',
        country: 'Germany',
        display: { added: false, highlighted: false },
        id: 2694,
        timezone: 'Europe/Berlin',
    },
]

describe('TimeZoneListElement', () => {
    it('renders the city with correct timezone in offset format', () => {
        const wrapper = mount(TimeZoneListElement, {
            props: {
                city: cities[0],
                tzView: 'number', // <= this prop is responisble for the timezone format (number is offset)
            },
            global: {
                plugins: [createTestingPinia()],
            },
        })
        expect(wrapper.get('[data-testid="city"]').text()).toBe('Hamburg')
        expect(wrapper.get('[data-testid="timezone"]').text()).toBe('+02:00')
    })

    it('renders the city with correct timezone in name format', () => {
        const wrapper = mount(TimeZoneListElement, {
            props: {
                city: cities[0],
                tzView: 'name', // <= this prop is responisble for the timezone format (name is official timezone name)
            },
            global: {
                plugins: [createTestingPinia()],
            },
        })

        expect(wrapper.get('[data-testid="timezone"]').text()).toBe('CEST')
    })

    it('calls store function to remove city from list when button is clicked', () => {
        const wrapper = mount(TimeZoneListElement, {
            props: {
                city: cities[0],
                tzView: 'name', // <= this prop is responisble for the timezone format (name is official timezone name)
            },
            global: {
                plugins: [createTestingPinia()],
            },
        })
        const cityStore = useCityStore()

        wrapper.get('[data-testid="remove-button"]').trigger('click')

        expect(cityStore.removeFromSelectedCities).toHaveBeenCalledTimes(1)
        expect(cityStore.removeFromSelectedCities).toHaveBeenCalledWith(cities[0])
    })
})
