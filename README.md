# Earth Online 🌍

**Habit RPG** — Complete daily missions → earn 任務幣 → Market / Lucky Draw → fight growing monsters.

## Current Stack (Modular)
- **Vite** + **TypeScript**
- ES Modules, fully modular structure
- Pure frontend, localStorage persistence
- Ready for future expansion (React / Flutter / Native App)

## Project Structure
```
src/
  data/          # static data (missions, shop, draw pool)
  state/         # GameState + load/save
  systems/       # business logic (mission, market, draw, battle)
  ui/            # rendering
  main.ts        # entry
  style.css
```

## How to run (in Codespace or local)
```bash
npm install
npm run dev
```
Then open the local URL (usually http://localhost:5173).

## Gameplay (MVP)
- 5 fixed daily Missions → +1 任務幣 each (once per day)
- Market: buy fixed-damage consumables
- Lucky Draw: 3 coins, possible 0 dmg
- Use items to attack monster
- Monster grows HP × 1.3 after defeat + Gold/Exp reward

## Future plans
- Permanent equipment
- New maps / more monsters
- Special skills
- Possibly Flutter / React Native for mobile App
- Backend for multi-device sync

---
Made with modular design so we can easily evolve.
