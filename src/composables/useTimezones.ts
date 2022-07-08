import { readonly, ref, shallowReactive, shallowRef } from 'vue'

// id counter
let ID = 0
export interface City {
    city: string
    country: string
    timezone: string
    id: number
}

// all cities with timezones, these will not mutate after generation so no reactive data needed. => better performance
const cityMapped = shallowReactive<City[]>([])

//list of selected cities
const selectedCities = ref<City[]>([])

const fetchTimezones = async () => {
    const cityMap = await fetch(
        'https://raw.githubusercontent.com/kevinroberts/city-timezones/master/data/cityMap.json'
    )
    const res = await cityMap.json()
    res.forEach((element: any) => {
        cityMapped.push({
            city: element.city,
            country: element.country,
            timezone: element.timezone,
            id: ID++,
        })
    })
}

// returns a list of filtered cities with timezones
const filteredCities = (searchQuery: string) => {
    if (searchQuery === '') {
        return []
    } else {
        return cityMapped
            .filter(
                (city) =>
                    city.city
                        .toLowerCase()
                        .includes(searchQuery.trim().toLowerCase()) //||
            )
            .slice(0, 10)
    }
}

//add to list of selected cities
const addTimezone = (inputCity: City) => {
    const index = selectedCities.value.findIndex(
        (zone) =>
            zone.city === inputCity.city && zone.country === inputCity.country
    )
    if (index === -1) {
        selectedCities.value.push(inputCity)
    }
}

//remove from list of selected cities
const removeTimezone = (removeCity: City) => {
    const index = selectedCities.value.findIndex(
        (zone) => zone.city === removeCity.city
    )
    if (index !== -1) {
        selectedCities.value.splice(index, 1)
    }
}

// return functions and state
export function useTimezones() {
    return {
        selectedCities: selectedCities,
        cityMapped: cityMapped,
        addTimezone,
        removeTimezone,
        fetchTimezones,
        filteredCities,
    }
}
