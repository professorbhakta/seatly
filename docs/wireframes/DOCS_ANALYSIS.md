# DOCS_ANALYSIS — docs & code coverage vs wireframe

Audit of product docs + Flutter UI against `docs/wireframes/`.

**Sources ingested**

| Source | Location | Status on `code-file` |
|--------|----------|------------------------|
| Product docs 01–10 | `origin/convApp` (`docs/*.md`) | Not copied to this branch; summarized here |
| Branch READMEs | `README.md`, `origin/convApp/README.md` | Read |
| Flutter UI | `lib/app.dart`, screens, widgets, providers, demo_data | Read |
| Design-system / routing docs named in the ask (`UI_ARCHITECTURE`, `FLOWS_BY_ROLE`, `FEATURES`, `ROUTING_AND_AUTH`, `DESIGN_SYSTEM_REVIEW`, `guides/*`) | — | **Absent** on all branches |

This prototype is built from **actual Seatly** (Passenger + Conductor), not from the generic Admin/Driver/CRUD template in the task prompt.

---

## Screen coverage

| Documented / implemented screen | In wireframe? | Screen id |
|---------------------------------|---------------|-----------|
| `SeatlyApp` / `_HomeShell` tabs | Yes (shell) | bottom nav |
| `PassengerHomeScreen` | Yes | `passenger-home` |
| `ServiceDetailScreen` | Yes | `service-detail` |
| `TrackScreen` | Yes | `track` |
| `ConductorHomeScreen` | Yes | `conductor-home` |
| `TripDetailScreen` | Yes | `trip-detail` |
| `SeatGrid` | Yes (embedded) | inside `trip-detail` |
| `OccupancyLabel` | Yes (pill) | list + detail |
| `PaymentSheet` | Yes (modal) | payment sheet |

**Verdict:** All v0.1 presentation screens from convApp UML + `lib/` are covered.

---

## Flow coverage

| Flow (convApp `03-rules-and-flows`) | Covered? | Notes |
|-------------------------------------|----------|-------|
| Passenger From → To → list → detail | Yes | Interactive |
| Occupancy labels (seats left / full · standing) | Yes | Live from store |
| PNR gate → Track | Yes | `ST9X2K1` + `EXP-1101` |
| Track without PNR blocked | Yes | Button disabled |
| Conductor trip list → seat map | Yes | |
| Tap free → payment → occupied | Yes | In-memory TripStore |
| Standing only when full | Yes | |
| Prefer issuance (no mark-filled) | Yes | Seat tap opens pay |

---

## Dual-audience features

| Requirement | Status |
|-------------|--------|
| Landing “How this app works” | Done |
| Role cards (one per role) | Done — Passenger, Conductor |
| Guided tour + “Tap here next” | Done |
| Breadcrumb / You are here + Back | Done |
| One-sentence caption per screen | Done |
| Optional flow map overlay | Done |
| Dev panel: RouteName, widget, file, Provider | Done |
| Names match production | Done — see DESIGN_SPEC |

---

## Intentional gaps (not in Seatly v0.1)

These appeared in the generic wireframe brief but **do not exist** in Seatly docs or code. Listed so QA does not file false bugs.

| Gap | Why intentional |
|-----|-----------------|
| Auth: sign in / sign up / logout | No auth providers or screens |
| Admin drawer, dashboard stat CRUD | Single two-tab app; no admin role |
| Entity CRUD (search FAB, edit form, delete confirm) | Conductor sells tickets; no admin entity forms |
| Batch ops / D2D channel / nested commuter lists | Different product domain |
| Driver START TRIP / Stop | No driver role |
| Commuter “Coming today” switch | No commuter role (Passenger ≠ school commuter) |
| Offline bottom tabs + sync banner | Hive is local persistence only; no sync UI |
| Named `app_router` / `route_names` | Uses `MaterialPageRoute`; logical paths only in DESIGN_SPEC |
| `DashboardShell`, `BrandAppBar`, yellow/black brand | Seatly brand is green M3 seed `#0B6E4F` |
| Real GPS / real UPI | Documented demo placeholders only |
| Fake book → PNR (next spiral B) | Planned on convApp; not implemented |
| Conductor day summary (next spiral C) | Planned; wireframe shows session sold counts only as demo chrome |
| Gujarati/Hindi copy (next spiral D) | Not in app yet |
| Multi-operator | Explicit non-goal for v0.1 |

---

## Doc link updates on this branch

| File | Change |
|------|--------|
| `docs/START_HERE.md` | **Created** — points to wireframes as preferred local demo |
| `docs/README.md` | **Created** — docs index + wireframe link |
| `docs/wireframes/*` | **Created** — this prototype kit |

Product narrative docs remain on `convApp`; agents should `git show origin/convApp:docs/…` when needed.

---

## Gaps to close later (optional)

1. Port or submodule convApp `docs/01`–`10` onto `code-file` for single-branch reading.
2. When GoRouter lands, update DESIGN_SPEC paths to real `RouteNames`.
3. When spiral B (fake book) ships, add a Book → PNR screen to the wireframe.
4. Replace emoji icons in HTML with SVG matching Material Icons if pixel-parity is required.
