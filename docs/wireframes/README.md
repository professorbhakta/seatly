# Seatly wireframes — local demo

Interactive HTML prototype for **Seatly** (Passenger line-up + Conductor ETM). Brand-faithful to Flutter (`ThemeData` seed `#0B6E4F`), with production widget names for developers.

## Open locally

### Option A — double-click

Open `index.html` in a browser (Chrome / Firefox / Edge / Safari).

No build step. All assets are relative (`styles.css`, `app.js`).

### Option B — local static server (optional)

From the repo root:

```bash
python3 -m http.server 8765
```

Then visit:

[http://localhost:8765/docs/wireframes/](http://localhost:8765/docs/wireframes/)

Or from this folder:

```bash
cd docs/wireframes && python3 -m http.server 8765
```

→ [http://localhost:8765/](http://localhost:8765/)

## What to try (2 minutes)

| Role | Path |
|------|------|
| **Passenger** | From **Ahmedabad** → To **Vadodara** → open **EXP-1101** → PNR `ST9X2K1` → **Track bus** |
| **Conductor** | Open a trip → tap a **free** seat → UPI or Cash → Confirm → seat turns occupied |
| **Standing** | Fill all seats (or use Conductor tour last step) → **Sell standing ticket** |
| **Dev** | Tap ⚙ or **Dev panel** for RouteName / widget / file / Provider |

Use **Guided tour** buttons on the landing page for “Tap here next” callouts.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing + phone-frame workspace |
| `styles.css` | Brand tokens + mobile-first layout |
| `app.js` | Screens registry, nav stack, TripStore, modals, tours |
| `DESIGN_SPEC.md` | Screen → route → widget → provider → file |
| `INTERACTIONS.md` | QA checklist (every tap) |
| `DOCS_ANALYSIS.md` | Docs coverage vs prototype + gaps |

## Related docs

- [../START_HERE.md](../START_HERE.md) — entry point for humans & agents
- [../README.md](../README.md) — docs index on this branch
- Product conversation (rules, vision): `origin/convApp` → `docs/01`–`10`
