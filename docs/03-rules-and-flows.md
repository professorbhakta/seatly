# Rules and flows

## Locked product rules

1. **GSRTC first** — expand to other operators later.
2. **Passenger search** — pick From station + To station → show matching services, line-up, and timings.
3. **Availability** — show seats left, OR `Seats full · N standing`.
4. **Standing** — passengers traveling standing when seats are full (**not** a waitlist).
5. **Live track** — only if seat is confirmed (online booking / confirmed PNR). Otherwise: line-up, timing, availability only.
6. **Conductor ETM** — seat map **first** → tap free seat → payment starts (Cash / UPI).
7. **Standing sales** — enabled only when seats are full; standing count increases; seats stay full.
8. **Occupancy cross-check** — online booked + onboard seated + standing tickets.
9. **Prefer issuance** — occupancy from selling tickets (seat tap = sell), not a separate “mark filled” step.

---

## Passenger flow

```
┌─────────────────┐
│ Open Passenger  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Pick From station│
└────────┬────────┘
         ▼
┌─────────────────┐
│ Pick To station  │
└────────┬────────┘
         ▼
┌─────────────────────────────────────┐
│ Service list: times + occupancy      │
│  · "N seats left"                    │
│  · "Seats full · M standing"       │
└────────┬────────────────────────────┘
         ▼
┌─────────────────┐
│ Service detail   │
└────────┬────────┘
         ▼
    ┌────┴────┐
    │ PNR?    │
    └────┬────┘
         │
    ┌────┴────────────────┐
    │                       │
    ▼                       ▼
Confirmed              Not confirmed
(valid PNR for          or no PNR
 this service)                │
    │                       ▼
    ▼                  Line-up + timing +
┌──────────┐           availability only
│ Track bus│           (no live map)
│ (live)   │
└──────────┘
```

**v0.1 demo unlock:** PNR `ST9X2K1` on service `EXP-1101` (Ahmedabad → Vadodara).

---

## Conductor flow

```
┌─────────────────┐
│ Open Conductor  │
│ ETM             │
└────────┬────────┘
         ▼
┌─────────────────┐
│ Select trip     │
└────────┬────────┘
         ▼
┌─────────────────────────────────────┐
│ Seat grid                            │
│  · Free (tap to sell)                │
│  · Occupied (onboard ticket sold)    │
│  · Online booked (pre-sold)          │
└────────┬────────────────────────────┘
         ▼
┌─────────────────┐
│ Tap FREE seat   │
└────────┬────────┘
         ▼
┌─────────────────────────────────────┐
│ Payment sheet (auto-opens)           │
│  · UPI (demo QR)                     │
│  · Cash confirm                      │
└────────┬────────────────────────────┘
         ▼
┌─────────────────┐
│ Seat → occupied │
│ Occupancy += 1  │
└────────┬────────┘
         ▼
    All seats full?
         │
    ┌────┴────┐
   No        Yes
    │          │
    │          ▼
    │   ┌──────────────────┐
    │   │ Sell standing     │
    │   │ ticket enabled    │
    │   └────────┬─────────┘
    │            ▼
    │   ┌──────────────────┐
    │   │ Payment →         │
    │   │ standing count +1 │
    │   └──────────────────┘
    ▼
  Continue selling
  seated tickets if
  any free seats remain
```

---

## Occupancy formula

```
occupied_seats = |online_booked ∪ onboard_sold|
seats_left = total_seats - occupied_seats

if seats_left > 0:
    label = "{seats_left} seats left"
else:
    label = "Seats full · {standing_count} standing"
```

Standing count increments only via standing ticket sales when `seats_left == 0`.
