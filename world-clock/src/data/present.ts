export type PresetCity = { name: string; country: string; tz: string; imageUrl?: string }

export const PRESET_CITIES: PresetCity[] = [
  { name: 'Stockholm', country: 'Sweden', tz: 'Europe/Stockholm' },
  { name: 'Oslo', country: 'Norway', tz: 'Europe/Oslo' },
  { name: 'Copenhagen', country: 'Denmark', tz: 'Europe/Copenhagen' },
  { name: 'Helsinki', country: 'Finland', tz: 'Europe/Helsinki' },
  { name: 'London', country: 'UK', tz: 'Europe/London' },
  { name: 'Paris', country: 'France', tz: 'Europe/Paris' },
  { name: 'Berlin', country: 'Germany', tz: 'Europe/Berlin' },
  { name: 'Madrid', country: 'Spain', tz: 'Europe/Madrid' },
  { name: 'Rome', country: 'Italy', tz: 'Europe/Rome' },
  { name: 'Athens', country: 'Greece', tz: 'Europe/Athens' },
  { name: 'New York', country: 'USA', tz: 'America/New_York' },
  { name: 'Chicago', country: 'USA', tz: 'America/Chicago' },
  { name: 'Denver', country: 'USA', tz: 'America/Denver' },
  { name: 'Los Angeles', country: 'USA', tz: 'America/Los_Angeles' },
  { name: 'Mexico City', country: 'Mexico', tz: 'America/Mexico_City' },
  { name: 'São Paulo', country: 'Brazil', tz: 'America/Sao_Paulo' },
  { name: 'Toronto', country: 'Canada', tz: 'America/Toronto' },
  { name: 'Dubai', country: 'UAE', tz: 'Asia/Dubai' },
  { name: 'Kolkata', country: 'India', tz: 'Asia/Kolkata' },
  { name: 'Bangkok', country: 'Thailand', tz: 'Asia/Bangkok' },
  { name: 'Singapore', country: 'Singapore', tz: 'Asia/Singapore' },
  { name: 'Shanghai', country: 'China', tz: 'Asia/Shanghai' },
  { name: 'Tokyo', country: 'Japan', tz: 'Asia/Tokyo' },
  { name: 'Sydney', country: 'Australia', tz: 'Australia/Sydney' },
  { name: 'Auckland', country: 'New Zealand', tz: 'Pacific/Auckland' }
]
