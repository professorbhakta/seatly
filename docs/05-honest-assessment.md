# Honest assessment

## The problem is real

GSRTC-style passengers routinely lack clear answers before boarding: which bus, when, how full, whether standing is the reality. Conductors work with ETMs that do not feel modern or passenger-aligned.

That friction is worth solving — even as a visibility product first.

## What is genuinely better about Seatly’s approach

**Seat-first sale beats manual “mark seats later.”**

If occupancy comes from ticket issuance (online booking + conductor seat tap + standing sale), the number passengers see matches what the conductor sold. No separate admin step to “fill” seats after the fact.

**Useful visibility before bigger logistics.**

v0.1 can deliver value as an awareness layer — timings, line-up, seats vs standing — without pretending to be a full logistics platform on day one.

## What is hard or missing today

| Gap | Reality |
|-----|---------|
| **Real schedules** | v0.1 uses demo Gujarat stations and services |
| **Real occupancy** | Hive-local demo; no live GSRTC/depot feed |
| **Real GPS track** | Demo map only when PNR matches; no fleet telematics |
| **Real payments** | Simulated UPI QR and cash confirm |
| **Official relationship** | Not affiliated with GSRTC; pilot would need depot/operator buy-in |

Production credibility requires **GSRTC or depot data access** — schedules, optionally booking feeds, and conductor device rollout. That is a partnership and ops problem, not just a Flutter problem.

## v0.1 what we actually have

- Flutter app on `main` / `code-file`: Passenger + Conductor tabs
- Rules in [03-rules-and-flows.md](03-rules-and-flows.md) reflected in demo behavior
- `flutter analyze` and `flutter test` passing on `main`
- This `convApp` branch for durable product memory

## Risks to watch

- **Naming collision** — “Seatly” exists elsewhere; app-store and trademark matter later
- **Conductor adoption** — devices, training, trust at depots
- **Scope creep** — booking marketplace, city-bus features, or live GPS before awareness works
- **Founder framing** — keep “awareness + easy process,” not logistics hype

## Bottom line

Seatly is a **credible prototype direction** for a real problem. It becomes a real product when data, conductors, and passengers are in the loop — not when we add more demo screens alone.
