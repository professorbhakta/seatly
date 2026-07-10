# Seatly — code-file (WIP)

> **This branch holds changeable / work-in-progress code.**  
> When features are tested and verified, merge into `main`.  
> Product ideas and conversation live on `convApp` (Markdown only).

**Asaan sawari — know before you board.**

GSRTC-first bus awareness demo with Passenger line-up/search and Conductor ETM seat-map ticketing. Not affiliated with GSRTC. Demo data and simulated UPI only.

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Stable, tested Flutter app |
| `code-file` | **You are here** — WIP / changeable implementation |
| `convApp` | Product vision, rules, and conversation docs (Markdown only) |

## Run

```bash
flutter pub get
flutter run
```

## Verify

```bash
flutter analyze
flutter test
```

## Demo flows

### Passenger
1. Open **Passenger** tab.
2. Pick **From** and **To** (e.g. Ahmedabad → Vadodara).
3. Browse services with depart/arrive times and occupancy.
4. Open a service detail; enter PNR `ST9X2K1` on **EXP-1101** to unlock **Track bus**.

### Conductor
1. Open **Conductor** tab and pick a trip.
2. Tap a **free** seat → payment sheet (demo UPI QR or cash confirm).
3. When all seats are full, **Sell standing ticket** becomes available.

## Tech

Flutter · Riverpod · Hive · qr_flutter
