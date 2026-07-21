# INTERACTIONS — QA checklist

Every meaningful tap in `docs/wireframes/index.html` → expected result.  
Use this as a manual QA script (≈5 minutes).

**Demo unlock:** PNR `ST9X2K1` · service `EXP-1101` · Ahmedabad → Vadodara.

---

## Landing / workspace

| # | User flow | Tap / action | Expected result |
|---|-----------|--------------|-----------------|
| L1 | Learn product | Read “How this app works” | Two roles + demo PNR called out |
| L2 | Enter Passenger | Role card **Passenger** | Phone shows `PassengerHomeScreen`; toast “Passenger home” |
| L3 | Enter Conductor | Role card **Conductor** | Phone shows `ConductorHomeScreen`; toast “Conductor ETM” |
| L4 | Guided tour | **Guided tour · Passenger** | Tour starts; “Tap here next” callout; From picker highlighted |
| L5 | Guided tour | **Guided tour · Conductor** | Tour starts on Conductor tab |
| L6 | Flow map | **Flow map** (landing or toolbar) | Overlay with Passenger + Conductor step lists |
| L7 | Close flow | **Close ✕** or `Esc` | Overlay dismisses |
| L8 | Reset | **Reset demo** | Occupancy store cleared; From/To/PNR cleared; Passenger home |
| L9 | Dev panel | Toolbar **Dev panel** or ⚙ | Dark panel: Screen id, RouteName, Path, Widget, File, Provider |
| L10 | Dev panel | `Esc` while panel open | Panel closes |
| L11 | Desktop rail | Click a screen name (wide viewport) | Jumps to that screen (pre-fills route context if needed) |

---

## Shell / chrome (every screen)

| # | User flow | Tap / action | Expected result |
|---|-----------|--------------|-----------------|
| C1 | Orientation | Read caption bar | One-sentence purpose for current screen |
| C2 | Orientation | Read breadcrumb | “You are here: …” with RouteName chain + role |
| C3 | Back | ← in app bar (when stack depth > 1) | Previous screen; stack pops |
| C4 | Back at root | ← or toolbar Back at home | Toast “You are at the home for this role” |
| C5 | Tabs | Bottom **Passenger** | `passenger-home`; stack reset |
| C6 | Tabs | Bottom **Conductor** | `conductor-home`; stack reset |

---

## Passenger flow

| # | User flow | Tap / action | Expected result |
|---|-----------|--------------|-----------------|
| P1 | Empty state | Open Passenger with no stations | “Pick From and To stations to see line-up.” |
| P2 | Filter | Select **From** Ahmedabad | From set; To options exclude Ahmedabad |
| P3 | Filter | Select **To** Vadodara | Service card **EXP-1101 · Ahmedabad Express** with occupancy pill |
| P4 | Filter | Same From and To | “From and To must be different stations.” |
| P5 | Filter | Route with no demo data | “No services found for this route (demo data).” |
| P6 | Open detail | Tap service card | `ServiceDetailScreen`; title = service id; route, times, OccupancyLabel |
| P7 | PNR gate | Type wrong PNR | Track button disabled; helper explains confirmation needed |
| P8 | PNR gate | Type `ST9X2K1` on EXP-1101 | Helper turns success; **Track bus** enabled |
| P9 | PNR gate | `ST9X2K1` on any other service | Track stays disabled |
| P10 | Track | Tap **Track bus** (when enabled) | `TrackScreen`; demo map + pins + ETA |
| P11 | Back | ← from Track | Returns to Service detail |
| P12 | Back | ← from Detail | Returns to Passenger home; list still filtered |

---

## Conductor flow

| # | User flow | Tap / action | Expected result |
|---|-----------|--------------|-----------------|
| D1 | Trip list | Open Conductor | All demo trips; “Seat map first · tap to sell”; session stat chips |
| D2 | Open trip | Tap a trip row | `TripDetailScreen`; SeatGrid + legend; standing button disabled if seats remain |
| D3 | Seat states | View grid | Free (green), Onboard (red), Online booked (teal) match production |
| D4 | Locked seats | Tap onboard or online seat | No payment sheet |
| D5 | Sell seat | Tap **free** seat | Modal `PaymentSheet`: title “Seat N”, ₹120, UPI selected, QR visible |
| D6 | Pay method | Tap **Cash** | Segment switches; cash copy; button “Confirm cash” |
| D7 | Pay method | Tap **UPI** | QR + “Confirm UPI received” |
| D8 | Cancel pay | Backdrop, ×, or `Esc` | Sheet closes; seat still free |
| D9 | Confirm pay | **Confirm UPI/cash** | Toast “Seat N sold”; sheet closes; seat → occupied; occupancy label updates |
| D10 | Standing locked | Standing button while seats remain | Disabled; label “Standing sales unlock when seats are full” |
| D11 | Standing unlock | Fill all seats (tour last step or sell remaining) | Standing button enabled with count |
| D12 | Sell standing | Tap standing → confirm | Toast; standing count +1; seats stay full |
| D13 | Persistence (session) | Leave trip and re-open | Sold seats / standing still applied (in-memory store) |
| D14 | Reset | Landing **Reset demo** | Sold seats cleared |

---

## Tours

| # | User flow | Tap / action | Expected result |
|---|-----------|--------------|-----------------|
| T1 | Passenger tour | Follow callouts / **Next** | Steps: From → To → card → PNR → Track btn → map |
| T2 | Conductor tour | Follow callouts / **Next** | Steps: tab → trip → grid → free seat → confirm → standing |
| T3 | Skip | **Skip tour** | Callout removed; toast “Tour ended” |

---

## Modals / motion (feel check)

| # | Check | Expected |
|---|--------|----------|
| M1 | Payment sheet open | Dim backdrop + sheet slides up |
| M2 | Toast | Slides in from top; auto-dismiss ~2.2s |
| M3 | Tour highlight | Pulsing outline on target |
| M4 | Dev panel | Fades/slides in over content |

---

## Not in product (do not expect)

| Item | Reason |
|------|--------|
| Sign in / sign up / logout | No auth in v0.1 Flutter or convApp docs |
| Admin drawer / CRUD entities | Not in Seatly scope |
| Driver START TRIP / D2D / batches | Different product; N/A |
| Offline sync banner | Not implemented |
| Delete confirmation modals | Sales are additive; no delete UI |

See [DOCS_ANALYSIS.md](DOCS_ANALYSIS.md) for the full gap list.
