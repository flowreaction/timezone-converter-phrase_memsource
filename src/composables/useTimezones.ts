import { reactive, readonly, ref } from 'vue'

export interface City {
    city: string
    country: string
    timezone: string
}

const cityMapped = ref<City[]>([])
const timezoneList = ref<City[]>([])

const fetchTimezones = async () => {
    const cityMap = await fetch(
        'https://raw.githubusercontent.com/kevinroberts/city-timezones/master/data/cityMap.json'
    )
    const res = await cityMap.json()
    res.forEach((element: any) => {
        cityMapped.value.push({
            city: element.city,
            country: element.country,
            timezone: element.timezone,
        })
    })
}

const addTimezone = (inputCity: City) => {
    const index = timezoneList.value.findIndex(
        (zone) =>
            zone.city === inputCity.city && zone.country === inputCity.country
    )
    if (index === -1) {
        timezoneList.value.push(inputCity)
    }
}

const removeTimezone = (removeCity: City) => {
    const index = timezoneList.value.findIndex(
        (zone) => zone.city === removeCity.city
    )
    if (index !== -1) {
        timezoneList.value.splice(index, 1)
    }
}

export function useTimezones() {
    return {
        timezones: readonly(timezoneList),
        cityMapped: readonly(cityMapped),
        addTimezone,
        removeTimezone,
        fetchTimezones,
    }
}
