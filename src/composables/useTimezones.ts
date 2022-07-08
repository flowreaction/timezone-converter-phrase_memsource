import { readonly, ref } from 'vue'

export interface City {
    city: string
    country: string
    timezone: string
}

// all cities with timezones, these will not mutate after generation so no reactive data needed. => better performance
const cityMapped: City[] = []

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
        })
    })
}

const filteredCities = (searchQuery: string) => {
    return cityMapped
    // if (searchQuery === '') {
    //     return cityMapped
    // } else {
    //     return cityMapped.filter(
    //         (city) =>
    //             city.city.toLowerCase().includes(searchQuery.toLowerCase()) //||
    //     )
    // }
}

const addTimezone = (inputCity: City) => {
    const index = selectedCities.value.findIndex(
        (zone) =>
            zone.city === inputCity.city && zone.country === inputCity.country
    )
    if (index === -1) {
        selectedCities.value.push(inputCity)
    }
}

const removeTimezone = (removeCity: City) => {
    const index = selectedCities.value.findIndex(
        (zone) => zone.city === removeCity.city
    )
    if (index !== -1) {
        selectedCities.value.splice(index, 1)
    }
}

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
