# Next spiral & non-goals

## Next spiral (likely v0.2+)

- Real or scraped schedule ingest (with legal/ops clarity)
- Auth + real PNR validation against a booking backend
- Production UPI / payment gateway integration
- GPS live track for confirmed passengers
- Conductor login, trip assignment, end-of-day reconciliation
- Hindi/Gujarati UI copy
- Accessibility pass on ETM (large touch targets, contrast)

## Explicit non-goals (v0.1)

- Official GSRTC partnership claims
- Full intercity booking marketplace (RedBus competitor)
- City-bus passes and urban multimodal (Chalo competitor)
- Waitlist for seats
- Separate “mark seat filled” admin chore
- Real money movement
- iOS/Android store release
- Multi-operator support beyond demo data

## Merge criteria for `main`

Before merging `code-file` → `main`:

1. `flutter analyze` — no issues
2. `flutter test` — all pass
3. Product rules in `docs/rules-flows.md` still satisfied
4. README run instructions updated if needed
