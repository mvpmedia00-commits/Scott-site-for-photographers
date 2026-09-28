const MINUTES: Record<string, number> = {
  "south loop": 6,
  loop: 8,
  "the loop": 8,
  streeterville: 16,
  "magnificent mile": 18,
  "gold coast": 22,
  "river north": 14,
  "west town": 18,
  "wicker park": 24,
  "logan square": 28,
  pilsen: 18,
  "university village": 16,
  "lakeshore east": 12,
  uptown: 28,
  lakeview: 26,
  "humboldt park": 26,
  "lincoln square": 32,
  edgewater: 34,
  rosemont: 42,
  "o’hare": 42,
  ohare: 42,
  lombard: 48,
  "west suburbs": 48,
  naperville: 42,
  schaumburg: 40,
  evanston: 28,
  "oak park": 22,
  "west loop": 14,
  "lincoln park": 20,
  frankfort: 52,
  aurora: 50,
  joliet: 50,
  hammond: 38,
  "northwest indiana": 40,
  "north shore": 36,
  winnetka: 38,
  wilmette: 34,
  "lake forest": 44,
  ravenswood: 30,
  boystown: 26,
  "near south side": 10,
  "downers grove": 40,
  "orland park": 40,
  "arlington heights": 42,
  wheeling: 42,
  citywide: 20,
  chicagoland: 28,
  chicago: 14,
  illinois: 28,
}

const FLIGHT_FROM_CHICAGO: Record<string, number> = {
  milwaukee: 120,
  detroit: 150,
  "new york": 150,
  nyc: 150,
  nashville: 165,
  atlanta: 165,
  miami: 180,
  orlando: 180,
  tampa: 180,
  jacksonville: 180,
  florida: 180,
  "south florida": 180,
  "palm beach": 180,
  "miami-dade": 180,
  arlington: 180,
  dallas: 180,
  houston: 180,
  "kansas city": 165,
  cincinnati: 150,
  louisville: 150,
  "st. louis": 165,
  "st louis": 165,
  durham: 165,
  bentonville: 180,
  "oklahoma city": 165,
  denver: 180,
  snowmass: 210,
  "los angeles": 250,
  hollywood: 250,
  "santa monica": 250,
  "united states": 180,
  "us portfolio": 180,
  mexico: 240,
  "los cabos": 270,
  "riviera maya": 240,
  london: 480,
  england: 480,
  scotland: 510,
  wales: 510,
  "united kingdom": 480,
  britain: 480,
  paris: 480,
  europe: 510,
  dubai: 780,
  "middle east": 780,
  africa: 900,
  tokyo: 780,
  singapore: 1020,
  "hong kong": 960,
  asia: 840,
  sydney: 1080,
  melbourne: 1080,
  australia: 1080,
  "new zealand": 1140,
  "asia-pacific": 960,
}

export function travelMinutes(neighborhood: string, location = "") {
  const hay = `${neighborhood} ${location}`.toLowerCase()
  if (
    /worldwide|global marketplace|any listed|85\+|800\+ cities|independent hotels on the board/.test(
      hay
    )
  ) {
    return 0
  }
  if (/online/.test(hay) && !/chicago/.test(hay)) {
    return 180
  }
  for (const [key, minutes] of Object.entries(MINUTES)) {
    if (hay.includes(key)) return minutes
  }
  for (const [key, minutes] of Object.entries(FLIGHT_FROM_CHICAGO)) {
    if (hay.includes(key)) return minutes
  }
  if (/chicago|naperville|schaumburg|evanston|illinois|chicagoland|hammond|indiana/.test(hay)) {
    return 28
  }
  return 55
}

export function distanceScore(minutes: number) {
  if (minutes <= 12) return 6
  if (minutes <= 25) return 5
  if (minutes <= 40) return 3
  if (minutes <= 60) return 1
  return 0
}

export function hotelDistanceScore(minutes: number) {
  if (minutes === 0) return 6
  if (minutes <= 50) return 5
  if (minutes <= 200) return 4
  return 3
}

export function travelLabel(minutes: number) {
  if (minutes === 0) return "Worldwide · apply from anywhere"
  if (minutes >= 480) return `${Math.round(minutes / 60)}h long-haul from Chicago`
  if (minutes >= 120) return `${Math.round(minutes / 60)}h from Chicago`
  return `${minutes} min from South Loop`
}
