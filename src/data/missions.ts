export interface Mission {
  id: string
  name: string
  icon: string
}

export const MISSIONS: Mission[] = [
  { id: 'work', name: '返工 / 上班', icon: '💼' },
  { id: 'sport', name: '運動 30 分鐘', icon: '🏃' },
  { id: 'study', name: '學習 / 讀書', icon: '📚' },
  { id: 'eat', name: '健康飲食', icon: '🥗' },
  { id: 'sleep', name: '早睡', icon: '😴' },
]
