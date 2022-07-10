import { setActivePinia, createPinia } from 'pinia'
import { useCityStore } from './useCityStore'
import { mockCities } from './mockCities'

describe('CityStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('exists', () => {
        expect(useCityStore).toBeDefined()
    })

    it('returns the city store', () => {
        const store = useCityStore()
        expect(store).toBeDefined()
    })

    it('fetches the cities from the source and stores them in cities array', async () => {
        const store = useCityStore()
        expect(store.cities).toHaveLength(0)
        const spy = vi
            .spyOn(store, 'fetchCitiesFromSource')
            .mockImplementation(async () => {})

        await store.fetchCities()

        expect(spy).toHaveBeenCalled()
    })

    it('cities array is filled', () => {
        const store = useCityStore()
        store.cities = mockCities

        console.log(store.cities)
        expect(store.cities).toHaveLength(mockCities.length)
    })
})
