# Earth Online 🌍

**Habit RPG Web App** — Complete daily missions → earn 任務幣 → buy weapons or lucky draw → fight growing monsters.

## How to play
1. Open `index.html` in any browser (or just open this repo in Codespace and use Live Server / simple HTTP server).
2. Complete the 5 fixed daily Missions (each gives 1 任務幣, once per day).
3. Use 任務幣 in **Market** to buy fixed-damage consumables, or spend on **Lucky Draw**.
4. Go to **打怪** and use your items to attack the monster.
5. When the monster dies, it refreshes with higher HP and you gain Gold + Exp.

## Features (MVP)
- Fixed daily Missions (no user editing yet)
- 任務幣 currency
- Market with fixed-damage items
- Lucky Draw (damage can be 0)
- Growing monsters (HP × 1.3 after each kill)
- Inventory, Gold, Exp, Level
- LocalStorage persistence (progress stays in browser)

## Tech
Pure HTML + CSS + Vanilla JS. No backend, no build step.

---
Made for fun. More features (permanent equipment, maps, special skills) coming later.
