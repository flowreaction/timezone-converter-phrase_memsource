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
        const spy = vi.spyOn(store, 'fetchCitiesFromSource').mockImplementation(async () => {})

        await store.fetchCities()

        expect(spy).toHaveBeenCalled()
    })

    it('cities array is filled', () => {
        const store = useCityStore()
        store.cities = mockCities

        expect(store.cities).toHaveLength(mockCities.length)
    })

    it('adds a city to the selected cities array', () => {
        const store = useCityStore()
        store.selectedCities = []
        store.cities = mockCities

        store.addToSelectedCities(mockCities[0])

        expect(store.selectedCities).toHaveLength(1)
    })
    it('removes city from selected cities array', () => {
        const store = useCityStore()
        store.selectedCities[0] = mockCities[0]
        console.log(store.selectedCities)

        expect(store.selectedCities).toHaveLength(1)

        store.removeFromSelectedCities(mockCities[0])

        expect(store.selectedCities).toHaveLength(0)
    })
    it('cleares the recent searches', () => {
        const store = useCityStore()
        store.recentSearches = mockCities

        expect(store.recentSearches).toHaveLength(mockCities.length)

        store.resetRecentSearches()

        expect(store.recentSearches).toHaveLength(0)
    })
})
