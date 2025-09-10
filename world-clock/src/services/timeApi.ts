export async function fetchTimezones(): Promise<string[]> {
  try {
    const res = await fetch('https://worldtimeapi.org/api/timezone')
    if (!res.ok) throw new Error('Failed to fetch time zones')
    const data = (await res.json()) as string[]
    return data.sort((a, b) => a.localeCompare(b))
  } catch {
    //fallback list used if the API is down/offline
    return [
      'Europe/Stockholm','Europe/Oslo','Europe/Copenhagen','Europe/Helsinki',
      'Europe/London','Europe/Paris','Europe/Berlin','Europe/Madrid','Europe/Rome','Europe/Athens',
      'UTC','Africa/Cairo','Africa/Johannesburg',
      'Asia/Dubai','Asia/Kolkata','Asia/Shanghai','Asia/Tokyo','Asia/Singapore','Asia/Bangkok',
      'Australia/Sydney','Pacific/Auckland',
      'America/New_York','America/Chicago','America/Denver','America/Los_Angeles','America/Mexico_City','America/Sao_Paulo','America/Toronto'
    ]
  }
}
