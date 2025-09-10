//display mode for clocks
export type DisplayMode = 'digital' | 'analog'

//time zone type
export type IANATimeZone = string

//model representing a saved city
export interface City {
  id: string
  name: string
  country: string
  tz: IANATimeZone
  imageUrl?: string
}

//settings controlling how clocks are displayed
export interface ClockSettings {
  mode: DisplayMode
  showSeconds: boolean
  hour12: boolean
}

//root app state persisted in localstorage
export interface AppState {
  cities: City[]
  settings: ClockSettings
}

//helper types 
export type CityCreate = Omit<City, 'id'>
export type CitySummary = Pick<City, 'id' | 'name' | 'tz'>

//type guard for validating data loaded from localStorage
export function isCity(value: unknown): value is City {
  if (typeof value !== 'object' || value === null) return false
  const c = value as City
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.country === 'string' &&
    typeof c.tz === 'string'
  )
}
