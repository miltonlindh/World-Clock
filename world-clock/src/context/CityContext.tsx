import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { AppState, CityCreate, ClockSettings } from '../types'
import { isCity } from '../types'

//default clock settings when app first loads
const defaultSettings: ClockSettings = {
  mode: 'digital',
  showSeconds: true,
  hour12: false
}

//default state if nothing saved yet or storage is empty
const defaultState: AppState = {
  cities: [],
  settings: defaultSettings
}

interface CityCtx {
  state: AppState
  addCity: (c: CityCreate) => void
  removeCity: (id: string) => void
  updateSettings: (s: Partial<ClockSettings>) => void
}

//create react context to share cities + settings across app
const Ctx = createContext<CityCtx | null>(null)

export function CityProvider({ children }: { children: React.ReactNode }) {
  //keep all data in localStorage so it's saved between reloads
  const [state, setState] = useLocalStorage<AppState>('world-clock', defaultState)

  //wrap all state actions in useMemo so they're stable
  const api: CityCtx = useMemo(
    () => ({
      state,
      //add new city with random id + all user data
      addCity: (c) =>
        setState(prev => ({
          ...prev,
          cities: [...prev.cities, { id: crypto.randomUUID(), ...c }]
        })),
      //remove city by id
      removeCity: (id) =>
        setState(prev => ({
          ...prev,
          cities: prev.cities.filter(x => x.id !== id)
        })),
      //update clock settings without losing anything else
      updateSettings: (s) =>
        setState(prev => ({
          ...prev,
          settings: { ...prev.settings, ...s }
        }))
    }),
    [state, setState]
  )

  //if saved data is broken somehow, reset to defaults
  if (!Array.isArray(state.cities) || !state.cities.every(isCity)) {
    setState(defaultState)
  }

  //provider wraps entire app and shares api + state
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useCity() {
  const ctx = useContext(Ctx)
  //make sure hook is only used inside provider
  if (!ctx) throw new Error('useCity must be used inside CityProvider')
  return ctx
}
