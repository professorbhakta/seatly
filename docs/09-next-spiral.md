# Next spiral

What to do after v0.1 — near-term polish, later pilot needs, and explicit non-goals.

---

## Near-term polish (v0.2 candidates)

Pick **one thin slice** at a time on `code-file`; document rule changes on `convApp` first.

| Priority | Item | Why |
|----------|------|-----|
| A | **Schedule data shape** — JSON or API stub for real-looking routes/times | Demo feels credible without GSRTC API yet |
| B | **Fake book flow** — passenger “books” seat → gets trackable PNR | Strengthens rule: track only when confirmed |
| C | **Conductor day summary** — trip start/end, seated + standing totals | Makes ETM credible for depot conversations |
| D | **Gujarati/Hindi UI copy** — tagline + key labels | Matches “Asaan sawari” audience |
| E | **Run-through fixes** — UX friction from founder demo session | Cheap wins after first real use |

Before any merge to `main`: `flutter analyze`, `flutter test`, rules still match [03-rules-and-flows.md](03-rules-and-flows.md).

---

## Later: GSRTC pilot needs

Not v0.1. Required before calling Seatly “real”:

- Official or licensed **schedule / stand data**
- Optional **online booking feed** for pre-sold seats
- **Conductor devices** and training at depot
- **Auth** for conductors (and passengers for real PNR)
- **Real payment** integration (UPI gateway)
- **GPS / telematics** for confirmed-passenger track only
- Legal, privacy, and GSRTC/depot **operating agreement**

---

## Explicit non-goals

Do **not** pursue these in the current spiral unless the founder explicitly redirects:

- Claiming official GSRTC partnership without one
- Full RedBus-style intercity booking marketplace
- City-bus passes and urban multimodal (Chalo competitor)
- Waitlist-for-seats feature (standing ≠ waitlist)
- Separate “mark seat filled” admin tool
- Real money movement in demo
- App Store / Play Store release
- Multi-operator support beyond demo data
- Rebrand blocking all feature work

---

## convApp maintenance

When decisions change:

1. Update the relevant `docs/0X-*.md` file on `convApp`
2. Add a line to [08-conversation-timeline.md](08-conversation-timeline.md)
3. Implement on `code-file`
4. Merge to `main` when verified

Keep this branch the **source of truth for product intent**, not for runnable code.
