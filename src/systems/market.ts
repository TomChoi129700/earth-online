import type { GameState, InventoryItem } from '../state/store'
import { SHOP } from '../data/shop'
import { addLog, saveState } from '../state/store'

export function buyItem(state: GameState, id: string): boolean {
  const item = SHOP.find(s => s.id === id)
  if (!item || state.coins < item.cost) return false

  state.coins -= item.cost
  const invItem: InventoryItem = {
    id: item.id + '-' + Date.now(),
    name: item.name,
    dmg: item.dmg,
    icon: item.icon,
  }
  state.inventory.push(invItem)
  addLog(state, `🛒 購買了 ${item.name} (+${item.dmg} 傷害)`)
  saveState(state)
  return true
}
