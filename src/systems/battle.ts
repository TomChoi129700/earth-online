import type { GameState } from '../state/store'
import { addLog, gainExp, saveState } from '../state/store'

export function useItem(state: GameState, index: number): boolean {
  const item = state.inventory[index]
  if (!item) return false

  state.inventory.splice(index, 1)

  const m = state.monster
  m.hp = Math.max(0, m.hp - item.dmg)
  addLog(state, `⚔️ 使用 ${item.name} 造成 ${item.dmg} 傷害！`)

  if (m.hp <= 0) {
    const goldGain = 5 + m.level * 3
    const expGain = 10 + m.level * 5
    state.gold += goldGain
    gainExp(state, expGain)
    addLog(state, `🎉 擊敗 ${m.name} Lv.${m.level}！+${goldGain} 金幣 +${expGain} EXP`)

    // grow monster
    const newLevel = m.level + 1
    const newMax = Math.round(m.maxHp * 1.3)
    state.monster = {
      name: m.name,
      level: newLevel,
      hp: newMax,
      maxHp: newMax,
    }
    addLog(state, `🐍 新怪物出現！${state.monster.name} Lv.${newLevel} (HP ${newMax})`)
  }

  saveState(state)
  return true
}
