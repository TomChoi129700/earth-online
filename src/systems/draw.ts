import type { GameState, InventoryItem } from '../state/store'
import { DRAW_POOL } from '../data/draw'
import { addLog, saveState } from '../state/store'

export function doLuckyDraw(state: GameState): { success: boolean; message: string } {
  if (state.coins < 3) {
    return { success: false, message: '任務幣不夠！' }
  }

  state.coins -= 3

  const total = DRAW_POOL.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  let result = DRAW_POOL[0]
  for (const p of DRAW_POOL) {
    if (r < p.weight) {
      result = p
      break
    }
    r -= p.weight
  }

  if (result.dmg > 0) {
    const invItem: InventoryItem = {
      id: 'draw-' + Date.now(),
      name: result.name,
      dmg: result.dmg,
      icon: '🎲',
    }
    state.inventory.push(invItem)
    addLog(state, `🎰 Lucky Draw 抽到 ${result.name} (${result.dmg})`)
    saveState(state)
    return { success: true, message: `🎉 抽到 <b>${result.name}</b> (${result.dmg} 傷害)！` }
  } else {
    addLog(state, `🎰 Lucky Draw：空獎...`)
    saveState(state)
    return { success: true, message: `😔 ${result.name}` }
  }
}
