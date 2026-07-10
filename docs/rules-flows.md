# Rules & flows

## Locked product rules

1. **GSRTC first** — expand to other operators later.
2. **Passenger search** — pick From + To → show matching services, line-up, and timings.
3. **Availability** — show seats left, OR `Seats full · N standing`.
4. **Standing** — passengers traveling standing when seats are full (NOT a waitlist).
5. **Live track** — only if seat is confirmed (online booking / confirmed PNR). Otherwise: line-up, timing, availability only.
6. **Conductor ETM** — seat map FIRST → tap free seat → payment starts (Cash / UPI).
7. **Standing sales** — enabled only when seats are full; standing count increases; seats stay full.
8. **Occupancy cross-check** — online booked + onboard seated + standing tickets.
9. **Prefer issuance** — occupancy from selling tickets (seat tap = sell), not a separate “mark filled” step.

## Passenger flow (v0.1 demo)

```
Pick From station
    → Pick To station
    → See filtered services (time + occupancy)
    → Open service detail
    → (Optional) Enter PNR
    → If confirmed PNR matches service → Track bus
    → Else → timing/availability only
```

**Demo unlock:** PNR `ST9X2K1` on service `EXP-1101` (Ahmedabad → Vadodara).

## Conductor flow (v0.1 demo)

```
Open trip list
    → Select trip
    → Seat grid (free / occupied / online booked)
    → Tap free seat → payment sheet (UPI QR or cash confirm)
    → Ticket issued → seat becomes occupied
    → When all seats full → Sell standing ticket enabled
    → Standing payment → standing count +1
```

## Occupancy formula

```
occupied_seats = unique(online_booked_seats ∪ onboard_sold_seats)
seats_left = total_seats - occupied_seats

if seats_left > 0:
    label = "{seats_left} seats left"
else:
    label = "Seats full · {standing_count} standing"
```
