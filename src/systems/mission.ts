import type { GameState } from '../state/store'
import { addLog, saveState } from '../state/store'

export function completeMission(state: GameState, id: string): boolean {
  if (state.completedToday[id]) return false
  state.completedToday[id] = true
  state.coins += 1
  addLog(state, '✅ 完成 Mission，獲得 1 任務幣')
  saveState(state)
  return true
}
