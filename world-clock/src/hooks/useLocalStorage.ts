import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  //set initial value from localStorage if found, otherwise use default
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch (err) {
      //if storage data is broken just start fresh
      console.error('Couldn’t load data from localStorage', err)
      return initial
    }
  })

  useEffect(() => {
    try {
      //save whenever value changes so data stays between reloads
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Couldn’t save data to localStorage', err)
    }
  }, [key, value])

  //return value + setter so hook works like useState
  return [value, setValue] as const
}
