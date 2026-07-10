# Product vision

## Working name

**Seatly** — temporary; may rename later (see [06-naming.md](06-naming.md)).

## One-line direction

**Asaan sawari — know before you board.**

## What Seatly is

A **GSRTC-first bus awareness and conductor ETM companion** with two faces in one app:

### Passenger

- Pick **From** and **To** stations
- See matching services: line-up, depart/arrive times
- See **availability**: seats left, or `Seats full · N standing`
- Open service detail for more context
- **Live track only if booking is confirmed** (e.g. valid PNR / online booking reference)
- Without confirmation: line-up, timing, and availability only — no map track

### Conductor (ETM)

- See today’s trips
- **Seat map first** — free, occupied (onboard), online-booked states
- Tap a **free** seat → payment starts automatically (Cash / UPI)
- When **all seats are full** → sell **standing** tickets; standing count increases
- No separate “mark seat filled” chore — selling the ticket is the occupancy update

## Occupancy model

Total picture = three sources:

```
occupancy = online booked seats + onboard seated tickets + standing tickets
```

Standing means passengers **traveling standing** when seats are full. It is **not** a waitlist.

## What Seatly is not (v0.1)

- Not a full RedBus-style intercity booking marketplace
- Not a city-bus pass app like Chalo (and we do not use the name Chalo)
- Not officially affiliated with GSRTC
- Not real-time production GPS or real payment rails yet

## North star

Passengers **know before they board**. Conductors **sell from the seat map**. Occupancy stays honest because it comes from tickets, not manual overrides.

## Expansion (later)

GSRTC first. Other STUs or private operators only after core passenger + conductor flows are proven in a pilot context.
