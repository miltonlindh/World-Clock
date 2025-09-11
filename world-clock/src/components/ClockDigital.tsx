import { useEffect, useState } from 'react'
import type { ClockSettings } from '../types'

//helper to extract HH/MM/SS for a specific time zone
function timeParts(tz: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(now)
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '00'
  return { h: get('hour'), m: get('minute'), s: get('second') }
}

export default function ClockDigital({ tz, settings }: { tz: string; settings: ClockSettings }) {
  const [t, setT] = useState(() => timeParts(tz))

  //tick once per second
  useEffect(() => {
    const id = setInterval(() => setT(timeParts(tz)), 1000)
    return () => clearInterval(id)
  }, [tz])

  //format hours 24h or 12h, depending on user settings
  const hour24 = t.h
  const hour12 = String((Number(t.h) % 12) || 12).padStart(2, '0')
  const suffix = settings.hour12 ? (Number(t.h) < 12 ? 'AM' : 'PM') : ''
  const hh = settings.hour12 ? hour12 : hour24

  return (
    <div className="digital">
      {hh}:{t.m}{settings.showSeconds ? `:${t.s}` : ''} {suffix}
    </div>
  )
}
