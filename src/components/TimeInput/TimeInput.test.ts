import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TimeInput from './TimeInput.vue'

describe('TimeInput ', () => {
    beforeEach(() => {
        // tell vitest we use mocked time
        vi.useFakeTimers()
    })

    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers()
    })

    const userDateString = '2222-01-01T12:34'
    const systemDateString = '2222-01-01T00:00'

    it('displays the system time on default', async () => {
        vi.setSystemTime(new Date(systemDateString))
        const wrapper = mount(TimeInput)
        const input = wrapper.get('[data-testid="timeinput"]')

        expect((input.element as HTMLInputElement).value).toBe(systemDateString)
    })

    it('displays the user time on input', async () => {
        vi.setSystemTime(new Date(systemDateString))

        const wrapper = mount(TimeInput)
        const input = wrapper.get('[data-testid="timeinput"]')

        await input.setValue(userDateString)
        expect((input.element as HTMLInputElement).value).toBe(userDateString)
    })

    it('renders the button as enabled', () => {
        const wrapper = mount(TimeInput)
        const button = wrapper.get('[data-testid="resetbutton"]')

        expect(button.attributes('disabled')).toBeUndefined()
    })

    it('displays the system time on reset', async () => {
        // vi.setSystemTime(new Date(systemDate))

        const wrapper = mount(TimeInput)
        const input = wrapper.get('[data-testid="timeinput"]')
        const button = wrapper.get('[data-testid="resetbutton"]')

        expect((input.element as HTMLInputElement).value).toBe(userDateString)
        await button.trigger('click')
        expect((input.element as HTMLInputElement).value).toBe(systemDateString)
    })

    it('renders the button as disabled', () => {
        const wrapper = mount(TimeInput)
        const button = wrapper.get('[data-testid="resetbutton"]')

        expect(button.attributes('disabled')).not.toBeUndefined()
    })

    it('renders the datetime local input and reset button', async () => {
        const wrapper = mount(TimeInput)
        const input = wrapper.find('input')
        const resetButton = wrapper.find('button')

        expect(input).toBeTruthy()
        expect(resetButton).toBeTruthy()
    })
})
