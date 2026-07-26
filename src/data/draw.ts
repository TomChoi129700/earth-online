export interface DrawResult {
  name: string
  dmg: number
  weight: number
}

export const DRAW_POOL: DrawResult[] = [
  { name: '空獎...', dmg: 0, weight: 25 },
  { name: '小石子', dmg: 3, weight: 25 },
  { name: '鋼刃', dmg: 8, weight: 20 },
  { name: '青銅劍', dmg: 15, weight: 15 },
  { name: '雷電魔法', dmg: 25, weight: 10 },
  { name: '傷害大劍', dmg: 40, weight: 5 },
]
