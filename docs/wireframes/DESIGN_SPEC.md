# DESIGN_SPEC — Seatly wireframe → Flutter implementation

Contract between this HTML prototype and production code on `code-file` / `main`.

**Brand seed:** `Color(0xFF0B6E4F)` in `lib/app.dart` → CSS `--primary: #0b6e4f`.

**Shell:** `_HomeShell` bottom `NavigationBar` (Passenger | Conductor) — not a named router; logical paths below are for design/docs only.

---

## Screen map

| Screen id (wireframe) | RouteName | Logical path | Flutter widget | File | Provider(s) |
|----------------------|-----------|--------------|----------------|------|-------------|
| `passenger-home` | `PassengerHome` | `/` | `PassengerHomeScreen` | `lib/screens/passenger/passenger_home_screen.dart` | `fromStationProvider`, `toStationProvider`, `filteredServicesProvider` |
| `service-detail` | `ServiceDetail` | `/service/:id` | `ServiceDetailScreen` | `lib/screens/passenger/service_detail_screen.dart` | `demoPnrProvider` |
| `track` | `Track` | `/track/:id` | `TrackScreen` | `lib/screens/passenger/track_screen.dart` | *(none — `StatelessWidget`)* |
| `conductor-home` | `ConductorHome` | `/conductor` | `ConductorHomeScreen` | `lib/screens/conductor/conductor_home_screen.dart` | `conductorTripsProvider`, `selectedTripProvider` |
| `trip-detail` | `TripDetail` | `/trip/:id` | `TripDetailScreen` | `lib/screens/conductor/trip_detail_screen.dart` | `conductorTripsProvider`, `tripStoreProvider` |

---

## Shared widgets

| UI piece | Widget class | File | Notes |
|----------|--------------|------|-------|
| Occupancy pill | `OccupancyLabel` | `lib/widgets/occupancy_label.dart` | `primaryContainer` / `errorContainer` |
| Seat map | `SeatGrid` | `lib/widgets/seat_grid.dart` | States: `free`, `occupied`, `onlineBooked` |
| Payment bottom sheet | `PaymentSheet` | `lib/widgets/payment_sheet.dart` | `PaymentMethod.upi` \| `cash`; seat ₹120, standing ₹80 |
| App root | `SeatlyApp` | `lib/app.dart` | `MaterialApp` + theme |
| Tab shell | `_HomeShell` | `lib/app.dart` | Local `_index` state |
| Station dropdown | `_StationPicker` | `passenger_home_screen.dart` | Private helper |
| Map pin | `_MapPin` | `track_screen.dart` | Private helper |

---

## Domain / data

| Symbol | File | Role |
|--------|------|------|
| `BusService`, `SeatStatus` | `lib/models/bus_service.dart` | Trip + occupancy getters |
| `Station` | `lib/models/station.dart` | Station id/name |
| `demo_data.dart` | `lib/data/demo_data.dart` | Stations, services, `demoPnr`, `canTrackWithPnr` |
| `TripStore` | `lib/data/trip_store.dart` | Hive persistence; wireframe uses in-memory equivalent |
| Providers | `lib/providers/app_providers.dart` | All Riverpod providers listed above |

---

## Navigation (production)

```
SeatlyApp → _HomeShell
  ├── [0] PassengerHomeScreen
  │         └── Navigator.push → ServiceDetailScreen(service)
  │                               └── Navigator.push → TrackScreen(service)  // if canTrackWithPnr
  └── [1] ConductorHomeScreen
            └── sets selectedTripProvider
            └── Navigator.push → TripDetailScreen(tripId)
                                  └── showModalBottomSheet → PaymentSheet
```

Wireframe mirrors this with a stack + bottom tabs. Back pops the stack; tab switch resets to that role’s home.

---

## Copy & rules to preserve

| Rule | Source |
|------|--------|
| Tagline: *Asaan sawari — know before you board* | Product vision / Passenger home |
| Demo PNR `ST9X2K1` only unlocks track on `EXP-1101` | `demo_data.dart` / rules doc |
| Occupancy: `N seats left` or `Seats full · M standing` | `BusService.occupancyLabel` |
| Standing sales only when `isSeatsFull` | `TripDetailScreen` |
| Seat tap = sell (no separate “mark filled”) | Rules doc |
| Not affiliated with GSRTC; demo UPI only | README / vision |

---

## Visual tokens (implement from)

| Token | Value / intent |
|-------|----------------|
| Primary seed | `#0B6E4F` |
| Primary container (pills, accents) | Light green (`primaryContainer`) |
| Free seat | `secondaryContainer` |
| Onboard occupied | `error` |
| Online booked | `tertiary` |
| Full occupancy pill | `errorContainer` |
| Typography (wireframe) | Outfit (display) + Figtree (body) — Flutter uses M3 defaults; prefer expressive fonts if branding is revisited |
| Motion | Sheet slide-up, toast slide-in, tour highlight pulse |

---

## Intentional non-screens

No `GoRouter` / `RouteNames` class in v0.1 — paths in this spec are **logical**. Implement with `MaterialPageRoute` until a router is introduced.
