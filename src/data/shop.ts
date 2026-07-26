export interface ShopItem {
  id: string
  name: string
  dmg: number
  cost: number
  icon: string
}

export const SHOP: ShopItem[] = [
  { id: 'wood', name: '木劍', dmg: 5, cost: 2, icon: '🔱' },
  { id: 'iron', name: '鐵劍', dmg: 12, cost: 4, icon: '⚔️' },
  { id: 'magic', name: '魔法彈', dmg: 20, cost: 7, icon: '🔮' },
  { id: 'fire', name: '火焰槍', dmg: 35, cost: 12, icon: '🔥' },
]
