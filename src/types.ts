export interface City {
    city: string
    country: string
    timezone: string
    id: number
}
export interface CityDisplay extends City {
    display: {
        highlighted: boolean
        added: boolean
    }
}
export type TimeZoneView = 'name' | 'number'
