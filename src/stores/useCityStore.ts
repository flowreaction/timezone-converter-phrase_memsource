import { defineStore } from 'pinia'
import { City, CityDisplay } from '../types'
import { useStorage } from '@vueuse/core'

function* idGenerator() {
    let id = 0
    while (true) {
        yield id++
    }
}
const generateID = idGenerator()
const nextID = () => generateID.next().value as number

export const useCityStore = defineStore('cityStore', {
    state: () => {
        return {
            selectedCities: [] as CityDisplay[],
            cities: useStorage<CityDisplay[]>('cities', []),
            recentSearches: useStorage<CityDisplay[]>('recentSearches', []),
        }
    },
    getters: {
        getCities: (state) => state.cities,
        getSelectedCities: (state) => state.selectedCities,
        getFilteredCities: (state) => (searchQuery: string) => {
            if (searchQuery === '') {
                return state.recentSearches
            } else {
                return state.cities
                    .filter((city) =>
                        city.city.toLowerCase().includes(searchQuery.trim().toLowerCase())
                    )
                    .slice(0, 10)
            }
        },
    },
    actions: {
        async fetchCities() {
            //check if cities in local storage, if not fetch from source
            if (this.cities.length !== 0) return
            else this.fetchCitiesFromSource()
        },
        async fetchCitiesFromSource() {
            const cityMap = await fetch(
                'https://raw.githubusercontent.com/kevinroberts/city-timezones/master/data/cityMap.json'
            )
            const res = await cityMap.json()
            res.forEach((element: any) => {
                this.cities.push({
                    city: element.city,
                    country: element.country,
                    timezone: element.timezone,
                    id: nextID(),
                    display: {
                        highlighted: false,
                        added: false,
                    },
                })
            })
        },
        addToRecentSearches(inputCity: CityDisplay) {
            const index = this.recentSearches.findIndex(
                (zone) => zone.city === inputCity.city && zone.country === inputCity.country
            )
            if (index === -1) {
                this.recentSearches.push({
                    display: {
                        added: false,
                        highlighted: false,
                    },
                    city: inputCity.city,
                    country: inputCity.country,
                    timezone: inputCity.timezone,
                    id: inputCity.id,
                })
            }
        },
        addToSelectedCities(inputCity: CityDisplay) {
            const index = this.selectedCities.findIndex(
                (zone) => zone.city === inputCity.city && zone.country === inputCity.country
            )
            if (index === -1) {
                this.selectedCities.push(inputCity)
            }
            this.addToRecentSearches(inputCity)
        },
        resetRecentSearches() {
            this.recentSearches = []
        },
        removeFromSelectedCities(removeCity: CityDisplay) {
            const index = this.selectedCities.findIndex(
                (zone) =>
                    zone.city === removeCity.city &&
                    zone.country === removeCity.country &&
                    zone.id === removeCity.id
            )
            if (index !== -1) {
                this.selectedCities.splice(index, 1)
            }
        },
    },
})
