import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { AppState, City, CityCreate, ClockSettings } from '../types'
import { isCity } from '../types'

//default clock settings
const defaultSettings: ClockSettings = {
  mode: 'digital',
  showSeconds: true,
  hour12: false
}

//default state used on first load or when resetting data
const defaultState: AppState = {
  cities: [],
  settings: defaultSettings
}

//context interface — defines everything we expose
interface CityCtx {
  state: AppState
  addCity: (c: CityCreate) => void
  removeCity: (id: string) => void
  updateSettings: (s: Partial<ClockSettings>) => void
}

//create the actual react context
const Ctx = createContext<CityCtx | null>(null)

export function CityProvider({ children }: { children: React.ReactNode }) {
  // Store all app state in localStorage under one key
  const [state, setState] = useLocalStorage<AppState>('world-clock', defaultState)

  //context API add/remove cities + update clock settings
  const api: CityCtx = useMemo(
    () => ({
      state,
      addCity: (c) =>
        setState(prev => ({
          ...prev,
          cities: [...prev.cities, { id: crypto.randomUUID(), ...c }]
        })),
      removeCity: (id) =>
        setState(prev => ({
          ...prev,
          cities: prev.cities.filter(x => x.id !== id)
        })),
      updateSettings: (s) =>
        setState(prev => ({
          ...prev,
          settings: { ...prev.settings, ...s }
        }))
    }),
    [state, setState]
  )

  //if saved data is broken or corrupted, reset to defaults
  if (!Array.isArray(state.cities) || !state.cities.every(isCity)) {
    setState(defaultState)
  }

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

//hook for consuming context safely
export function useCity() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCity must be used within CityProvider')
  return ctx
}
