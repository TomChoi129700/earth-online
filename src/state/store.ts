export interface InventoryItem {
  id: string
  name: string
  dmg: number
  icon: string
}

export interface Monster {
  name: string
  level: number
  hp: number
  maxHp: number
}

export interface GameState {
  coins: number
  gold: number
  exp: number
  level: number
  inventory: InventoryItem[]
  completedToday: Record<string, boolean>
  lastDate: string
  monster: Monster
  log: string[]
}

const STORAGE_KEY = 'earthOnline'

export function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function createInitialState(): GameState {
  return {
    coins: 0,
    gold: 0,
    exp: 0,
    level: 1,
    inventory: [],
    completedToday: {},
    lastDate: today(),
    monster: { name: '史萊姆', level: 1, hp: 40, maxHp: 40 },
    log: [],
  }
}

export function loadState(): GameState {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    const s = createInitialState()
    saveState(s)
    return s
  }
  const saved = JSON.parse(raw) as GameState
  // daily reset
  if (saved.lastDate !== today()) {
    saved.completedToday = {}
    saved.lastDate = today()
    saveState(saved)
  }
  return saved
}

export function saveState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function addLog(state: GameState, msg: string): void {
  state.log.unshift(msg)
  if (state.log.length > 30) state.log.pop()
}

export function gainExp(state: GameState, amount: number): void {
  state.exp += amount
  while (state.exp >= state.level * 50) {
    state.exp -= state.level * 50
    state.level++
    addLog(state, `🎉 升級！現在是 Lv.${state.level}`)
  }
}
