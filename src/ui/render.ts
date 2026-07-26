import type { GameState } from '../state/store'
import { MISSIONS } from '../data/missions'
import { SHOP } from '../data/shop'
import { completeMission } from '../systems/mission'
import { buyItem } from '../systems/market'
import { doLuckyDraw } from '../systems/draw'
import { useItem } from '../systems/battle'

export function renderApp(state: GameState, root: HTMLElement, onUpdate: () => void) {
  root.innerHTML = `
    <div class="header">
      <h1>🌍 Earth Online</h1>
      <div class="stats">
        <div>Lv <span id="level">${state.level}</span></div>
        <div>EXP <span id="exp">${state.exp}</span></div>
        <div>💰 <span id="gold">${state.gold}</span></div>
        <div>📦 <span id="coins">${state.coins}</span> 任務幣</div>
      </div>
    </div>

    <div class="tabs">
      <div class="tab active" data-tab="missions">Mission</div>
      <div class="tab" data-tab="inventory">背包</div>
      <div class="tab" data-tab="market">Market</div>
      <div class="tab" data-tab="draw">Lucky</div>
      <div class="tab" data-tab="battle">打怪</div>
    </div>

    <div id="missions" class="panel active">
      <div class="card">
        <h3>今日 Mission（每個只可完成一次）</h3>
        <div id="mission-list"></div>
      </div>
    </div>

    <div id="inventory" class="panel">
      <div class="card">
        <h3>你的背包</h3>
        <div id="inv-list"></div>
      </div>
    </div>

    <div id="market" class="panel">
      <div class="card">
        <h3>Market — 用任務幣買固定傷害道具</h3>
        <div id="shop-list"></div>
      </div>
    </div>

    <div id="draw" class="panel">
      <div class="card">
        <h3>Lucky Draw</h3>
        <p style="color:var(--muted);font-size:0.9rem;margin-bottom:12px;">花 3 任務幣抽一次，傷害可以是 0！</p>
        <button class="btn btn-purple" id="btn-draw" style="width:100%;padding:14px;">🎰 抽獎（3 任務幣）</button>
        <div id="draw-result" style="margin-top:12px;text-align:center;font-size:1.1rem;"></div>
      </div>
    </div>

    <div id="battle" class="panel">
      <div class="card">
        <div class="monster-name" id="monster-name"></div>
        <div style="font-size:0.85rem;color:var(--muted);">HP: <span id="monster-hp"></span> / <span id="monster-max"></span></div>
        <div class="hp-bar-wrap"><div class="hp-bar" id="hp-bar"></div></div>
        <div id="attack-buttons" style="margin-top:12px;"></div>
        <div class="log" id="battle-log"></div>
      </div>
    </div>
  `

  // Tabs
  root.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      root.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
      root.querySelectorAll('.panel').forEach(p => p.classList.remove('active'))
      tab.classList.add('active')
      const panel = root.querySelector(`#${(tab as HTMLElement).dataset.tab}`)
      panel?.classList.add('active')
      if ((tab as HTMLElement).dataset.tab === 'battle') renderBattle(state, root, onUpdate)
      if ((tab as HTMLElement).dataset.tab === 'inventory') renderInventory(state, root, onUpdate)
      if ((tab as HTMLElement).dataset.tab === 'market') renderShop(state, root, onUpdate)
    })
  })

  renderMissions(state, root, onUpdate)
  renderInventory(state, root, onUpdate)
  renderShop(state, root, onUpdate)
  renderBattle(state, root, onUpdate)

  const btnDraw = root.querySelector('#btn-draw') as HTMLButtonElement
  btnDraw?.addEventListener('click', () => {
    const result = doLuckyDraw(state)
    const resultEl = root.querySelector('#draw-result')
    if (resultEl) resultEl.innerHTML = result.message
    onUpdate()
  })
}

function renderMissions(state: GameState, root: HTMLElement, onUpdate: () => void) {
  const list = root.querySelector('#mission-list')
  if (!list) return
  list.innerHTML = MISSIONS.map(m => {
    const done = state.completedToday[m.id]
    return `
      <div class="mission-item">
        <div>${m.icon} ${m.name}</div>
        <button class="btn ${done ? 'btn-success' : 'btn-primary'}" 
                data-mission="${m.id}" ${done ? 'disabled' : ''}>
          ${done ? '已完成' : '完成 +1幣'}
        </button>
      </div>`
  }).join('')

  list.querySelectorAll('button[data-mission]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.mission!
      if (completeMission(state, id)) onUpdate()
    })
  })
}

function renderInventory(state: GameState, root: HTMLElement, onUpdate: () => void) {
  const list = root.querySelector('#inv-list')
  if (!list) return
  if (state.inventory.length === 0) {
    list.innerHTML = '<div class="empty">背包是空的，去 Market 或 Lucky Draw 拿道具吧</div>'
    return
  }
  list.innerHTML = state.inventory.map((item, idx) => `
    <div class="inv-item">
      <div>${item.icon || '📦'} ${item.name} <span class="badge">${item.dmg} 傷害</span></div>
      <button class="btn btn-danger" data-idx="${idx}">使用攻擊</button>
    </div>`).join('')

  list.querySelectorAll('button[data-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number((btn as HTMLElement).dataset.idx)
      if (useItem(state, idx)) onUpdate()
    })
  })
}

function renderShop(state: GameState, root: HTMLElement, onUpdate: () => void) {
  const list = root.querySelector('#shop-list')
  if (!list) return
  list.innerHTML = SHOP.map(s => `
    <div class="shop-item">
      <div>${s.icon} ${s.name} <span class="badge">${s.dmg} 傷害</span></div>
      <button class="btn btn-primary" data-shop="${s.id}" 
              ${state.coins < s.cost ? 'disabled' : ''}>
        ${s.cost} 幣
      </button>
    </div>`).join('')

  list.querySelectorAll('button[data-shop]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.shop!
      if (buyItem(state, id)) onUpdate()
    })
  })
}

function renderBattle(state: GameState, root: HTMLElement, onUpdate: () => void) {
  const m = state.monster
  const nameEl = root.querySelector('#monster-name')
  const hpEl = root.querySelector('#monster-hp')
  const maxEl = root.querySelector('#monster-max')
  const bar = root.querySelector('#hp-bar') as HTMLElement
  const btns = root.querySelector('#attack-buttons')
  const logEl = root.querySelector('#battle-log')

  if (nameEl) nameEl.textContent = `${m.name} Lv.${m.level}`
  if (hpEl) hpEl.textContent = String(m.hp)
  if (maxEl) maxEl.textContent = String(m.maxHp)
  if (bar) bar.style.width = Math.max(0, (m.hp / m.maxHp) * 100) + '%'

  if (btns) {
    if (state.inventory.length === 0) {
      btns.innerHTML = '<div class="empty">沒有可用道具，先去拿一些吧</div>'
    } else {
      btns.innerHTML = state.inventory.map((item, idx) => `
        <button class="btn btn-danger" style="margin:4px;" data-idx="${idx}">
          ${item.icon || '📦'} ${item.name} (${item.dmg})
        </button>`).join('')

      btns.querySelectorAll('button[data-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = Number((btn as HTMLElement).dataset.idx)
          if (useItem(state, idx)) onUpdate()
        })
      })
    }
  }

  if (logEl) {
    logEl.innerHTML = state.log.slice(0, 12).map(l => `<div>${l}</div>`).join('') || '<div>還沒有戰鬥記錄</div>'
  }
}
