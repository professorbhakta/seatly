# Conversation timeline

Condensed evolution of Seatly decisions. For full rules see [03-rules-and-flows.md](03-rules-and-flows.md).

---

## 1. GSRTC ETM pain

Founder observed boring, hard conductor ETM UIs. Selling tickets should feel modern and map-first, not like legacy counter software.

## 2. Flutter as build target

Chose **Flutter** for cross-platform passenger + conductor surfaces in one codebase. Stack settled as Riverpod + Hive + qr_flutter for v0.1 demo.

## 3. Passenger awareness idea

Shift from “booking app only” to **know before you board**: from→to search, line-up, timings, seats left vs standing when full. Not affiliated with GSRTC; demo data first.

## 4. Chalo research

Looked at city-bus apps (Chalo: live track, tickets, passes). Concluded Seatly is **not** Chalo — different transit type, and **the name Chalo is taken**. Do not use it.

## 5. Seat + standing model

Defined **standing** as passengers traveling standing when seats are full — **not** a waitlist. Occupancy label: `N seats left` or `Seats full · M standing`.

## 6. Seat-first payment

Conductor flow locked: **seat map first** → tap free seat → payment sheet opens (Cash / UPI). Occupancy from ticket issuance, not a separate “mark filled” chore.

## 7. Track only with confirmed booking

Live map track **only** if passenger has confirmed booking (demo PNR `ST9X2K1` on `EXP-1101`). Otherwise line-up and availability only.

## 8. Occupancy sources

Cross-check from: online booked seats + onboard seated tickets + standing tickets.

## 9. Naming

**Seatly** as working name. Noted Seatly/OpenSeat crowded elsewhere. Tagline direction: *Asaan sawari — know before you board.*

## 10. Repo + three branches

Created [professorbhakta/seatly](https://github.com/professorbhakta/seatly):

- `main` — v0.1 Flutter demo, analyze + test clean
- `code-file` — WIP copy
- `convApp` — this documentation branch

## 11. convApp refresh (current)

Numbered docs `01`–`09`, `CONTRIBUTING.md`, docs-first tree so future agents/humans need no old chat.

---

## v0.1 demo snapshot (on `main`)

- Bottom tabs: Passenger | Conductor
- Sample Gujarat stations and services
- PNR-gated track screen
- Conductor seat grid, demo UPI/cash, standing when full

Next product/code steps: see [09-next-spiral.md](09-next-spiral.md).
