import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, initial: T) {
  //initialize state from localstorage on first render
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch (err) {
      console.error('Failed to read from localStorage:', err)
      return initial
    }
  })

  //persist value to localstorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error('Failed to write to localStorage:', err)
    }
  }, [key, value])

 
  return [value, setValue] as const
}
