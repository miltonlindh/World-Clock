import { useEffect, useMemo, useState } from 'react'
import type { ClockSettings } from '../types'

function getTimeParts(tz: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).formatToParts(now)

  //helper fn to grab hour/min/sec as numbers
  const get = (type: string) => Number(parts.find(p => p.type === type)?.value ?? '0')
  return { h: get('hour'), m: get('minute'), s: get('second') }
}

export default function ClockAnalog({ tz, settings }: { tz: string; settings: ClockSettings }) {
  //store current time for this timezone
  const [t, setT] = useState(() => getTimeParts(tz))

  useEffect(() => {
    //update time every second
    const id = setInterval(() => setT(getTimeParts(tz)), 1000)
    return () => clearInterval(id)
  }, [tz])

  //make an array of 60 ticks for the dial, calculate once
  const ticks = useMemo(() => Array.from({ length: 60 }, (_, i) => i), [])

  //calculate angles for hour, minute, second hands
  const secDeg = t.s * 6
  const minDeg = t.m * 6 + t.s * 0.1
  const hourDeg = (t.h % 12) * 30 + t.m * 0.5

  return (
    <section className="analog" aria-label={`Analog clock for ${tz}`}>
      <div className="dial">
        {/*draw the 60 ticks around the dial */}
        {ticks.map(i => (
          <div
            key={i}
            className={`tick ${i % 5 === 0 ? 'big' : ''}`}
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 6}deg) translateY(-85px)`
            }}
            aria-hidden="true"
          />
        ))}

        {/*hour, minute, and optional second hands */}
        <div
          className="hand hour"
          style={{ transform: `rotate(${hourDeg}deg)` }}
          aria-label="Hour hand"
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minDeg}deg)` }}
          aria-label="Minute hand"
        />
        {settings.showSeconds && (
          <div
            className="hand second"
            style={{ transform: `rotate(${secDeg}deg)` }}
            aria-label="Second hand"
          />
        )}

        {/*center dot to make it look cleaner */}
        <div className="center" aria-hidden="true" />
      </div>
    </section>
  )
}
