import { useEffect, useMemo, useState } from 'react'
import type { ClockSettings } from '../types'

//get numeric hours/minutes/seconds for the time zone
function getTimeParts(tz: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(now)
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? '0')
  return { h: get('hour'), m: get('minute'), s: get('second') }
}

export default function ClockAnalog({ tz, settings }: { tz: string; settings: ClockSettings }) {
  const [t, setT] = useState(() => getTimeParts(tz))

  //update once per second
  useEffect(() => {
    const id = setInterval(() => setT(getTimeParts(tz)), 1000)
    return () => clearInterval(id)
  }, [tz])

  //precompute tick indices (0..59)
  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => i), [])

  //angles for hands
  const secDeg = t.s * 6
  const minDeg = t.m * 6 + t.s * 0.1
  const hourDeg = (t.h % 12) * 30 + t.m * 0.5

  return (
    <div className="analog">
      <div className="dial">
        {/*minute ticks (every 5th is "big") */}
        {ticks.map(i => (
          <div
            key={i}
            className={`tick ${i % 5 === 0 ? 'big' : ''}`}
          style={{ transform: `translate(-50%, -50%) rotate(${i * 6}deg) translateY(-85px)` }}

          />
        ))}

        {/*hour, minute and optionally second hands */}
        <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
        <div className="hand minute" style={{ transform: `rotate(${minDeg}deg)` }} />
        {settings.showSeconds && (
          <div className="hand second" style={{ transform: `rotate(${secDeg}deg)` }} />
        )}

        <div className="center" />
      </div>
    </div>
  )
}
