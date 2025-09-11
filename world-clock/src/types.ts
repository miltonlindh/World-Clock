//what kind of clock mode user picked
export type DisplayMode = 'digital' | 'analog'

//just a string but easier to understand what it means
export type IANATimeZone = string

//single city object we save in state
export interface City {
  id: string
  name: string
  country: string
  tz: IANATimeZone
  imageUrl?: string //optional if user adds a custom image
}

//settings for how clocks are shown in the UI
export interface ClockSettings {
  mode: DisplayMode
  showSeconds: boolean
  hour12: boolean
}

//whole app state saved in localStorage
export interface AppState {
  cities: City[]
  settings: ClockSettings
}

//helper types to reuse city structure in different places
export type CityCreate = Omit<City, 'id'> //for adding a new city, id gets created automatically
export type CitySummary = Pick<City, 'id' | 'name' | 'tz'> //for lightweight views

//make sure stored city data is valid before using it
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
