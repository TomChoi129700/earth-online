import './style.css'
import { loadState } from './state/store'
import { renderApp } from './ui/render'

const root = document.querySelector('#app') as HTMLElement
let state = loadState()

function update() {
  // re-render whole app for simplicity (MVP)
  // later can make more granular updates
  renderApp(state, root, update)
}

renderApp(state, root, update)
