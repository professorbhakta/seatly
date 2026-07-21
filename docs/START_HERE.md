# START HERE — Seatly

You are on the **`code-file`** branch (WIP Flutter implementation).

## 1. See the product in 2 minutes (preferred)

Open the interactive HTML prototype:

**[wireframes/index.html](wireframes/index.html)**

- Landing explains how the app works + role cards  
- Phone frame runs Passenger and Conductor flows  
- Guided tours with “Tap here next”  
- Dev panel (⚙) shows Flutter widget names and file paths  

```bash
# optional
python3 -m http.server 8765
# open http://localhost:8765/docs/wireframes/
```

Details: [wireframes/README.md](wireframes/README.md).

## 2. Run the real Flutter app

```bash
flutter pub get
flutter run
```

Demo paths:

- **Passenger:** Ahmedabad → Vadodara → EXP-1101 → PNR `ST9X2K1` → Track bus  
- **Conductor:** Pick trip → tap free seat → confirm UPI/Cash → when full, sell standing  

## 3. Implementation contract

| Doc | Use when |
|-----|----------|
| [wireframes/DESIGN_SPEC.md](wireframes/DESIGN_SPEC.md) | Mapping UI → Dart widgets / providers |
| [wireframes/INTERACTIONS.md](wireframes/INTERACTIONS.md) | Manual QA of the prototype (and parity checks) |
| [wireframes/DOCS_ANALYSIS.md](wireframes/DOCS_ANALYSIS.md) | What is in / out of scope vs docs |

## 4. Product rules (convApp)

Locked rules and flows are on `origin/convApp`:

- `docs/02-product-vision.md`  
- `docs/03-rules-and-flows.md`  
- `docs/09-next-spiral.md`  
- `docs/10-uml-diagrams.md`  

```bash
git show origin/convApp:docs/03-rules-and-flows.md
```

## 5. Branch map

| Branch | Contents |
|--------|----------|
| `main` | Stable Flutter |
| `code-file` | **You are here** — changeable code + this docs/wireframes kit |
| `convApp` | Product Markdown only |

North star: passengers **know before they board**; conductors **sell from the seat map**.
