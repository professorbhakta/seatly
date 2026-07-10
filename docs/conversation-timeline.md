# Conversation timeline (condensed)

## Session goal

Bootstrap **Seatly** — GSRTC-first bus awareness + conductor ETM — with a three-branch repo workflow.

## Key decisions captured

1. **GSRTC first**, expand later.
2. **Passenger:** From/To search → services with timings and occupancy (`seats left` or `Seats full · N standing`).
3. **Standing** = traveling standing when full, not a waitlist.
4. **Live track** only with confirmed booking (demo PNR `ST9X2K1` on `EXP-1101`).
5. **Conductor:** seat map first; tap free seat → payment; standing when full.
6. **Occupancy** from ticket issuance (online + onboard + standing).
7. **Tech:** Flutter, Riverpod, Hive, qr_flutter.
8. **Branches:** `main` (stable), `code-file` (WIP), `convApp` (docs only).
9. **Naming:** Seatly working name; avoid Chalo; OpenSeat also crowded.

## v0.1 delivered

- Flutter app with Passenger | Conductor bottom tabs
- Demo Gujarat stations and services
- PNR-gated track screen
- Conductor seat grid with demo UPI/cash payment sheet
- Standing sales when seats full
- `flutter analyze` + `flutter test` pass on `main`

## Next user action

Wait for founder’s next command after branches are on GitHub.
