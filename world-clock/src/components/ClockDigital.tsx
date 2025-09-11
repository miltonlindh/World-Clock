import { useEffect, useState } from 'react'
import type { ClockSettings } from '../types'

function timeParts(tz: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(now)

  //helper to grab hour/min/sec as strings
  const get = (type: string) => parts.find(p => p.type === type)?.value ?? '00'
  return { h: get('hour'), m: get('minute'), s: get('second') }
}

export default function ClockDigital({ tz, settings }: { tz: string; settings: ClockSettings }) {
  //keep current time for this timezone
  const [t, setT] = useState(() => timeParts(tz))

  useEffect(() => {
    //update clock every second
    const id = setInterval(() => setT(timeParts(tz)), 1000)
    return () => clearInterval(id)
  }, [tz])

  //decide if we show 24h or 12h based on user settings
  const hour24 = t.h
  const hour12 = String((Number(t.h) % 12) || 12).padStart(2, '0')
  const suffix = settings.hour12 ? (Number(t.h) < 12 ? 'AM' : 'PM') : ''
  const hh = settings.hour12 ? hour12 : hour24

  return (
    <section
      className="digital"
      aria-label={`Digital clock for ${tz}`}
    >
      <time dateTime={`${hh}:${t.m}:${t.s}`}>
        {/*always show hours + minutes, seconds optional */}
        {hh}:{t.m}
        {settings.showSeconds ? `:${t.s}` : ''}
        {suffix && ` ${suffix}`}
      </time>
    </section>
  )
}
