import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TimeZoneList from './TimeZoneList.vue'

describe('TimeZoneList', () => {
    it('renders message when timezones have been added', () => {
        const wrapper = mount(TimeZoneList)
        const defaultSlot = wrapper.get(
            '[data-testid="timezonelist-defaultslot"]'
        )

        expect(defaultSlot.text()).toContain('No cities have been added.')
    })

    it('it switches scoped slot on click of timezone button', async () => {
        const wrapper = mount(TimeZoneList, {
            slots: {
                default: `<template #scoped="{tzview}" data-testid="scoped"> {{ tzview }} </template>`,
            },
        })
        const button = wrapper.get('[data-testid="toggle-tz-view"]')

        //expecting inital state of scoped slot to be 'name'
        expect(wrapper.html()).toContain('name')

        //clicking button should switch scoped slot to 'number'
        await button.trigger('click')
        expect(wrapper.html()).toContain('number')

        //clicking button again should switch scoped slot back to 'name'
        await button.trigger('click')
        expect(wrapper.html()).toContain('name')
    })
})
