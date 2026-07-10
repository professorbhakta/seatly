# UML diagrams

Seatly v0.1 — product and domain model views. Diagrams use [Mermaid](https://mermaid.js.org/) (renders on GitHub).

Related: [02-product-vision.md](02-product-vision.md) · [03-rules-and-flows.md](03-rules-and-flows.md)

Implementation reference: Flutter app on `main` / `code-file` branches.

---

## 1. Use case diagram

Actors and what they can do in v0.1.

```mermaid
flowchart LR
  subgraph actors[" "]
    P((Passenger))
    C((Conductor))
  end

  subgraph passengerUC["Passenger"]
    UC1[Search route\nFrom → To]
    UC2[View service line-up\n& timings]
    UC3[View occupancy\nseats / standing]
    UC4[Enter PNR]
    UC5[Track bus live]
    UC6[View service detail]
  end

  subgraph conductorUC["Conductor ETM"]
    UC7[List trips]
    UC8[View seat map]
    UC9[Sell seated ticket]
    UC10[Collect payment\nCash / UPI]
    UC11[Sell standing ticket]
  end

  P --> UC1
  P --> UC2
  P --> UC3
  P --> UC4
  P --> UC6
  P --> UC5

  C --> UC7
  C --> UC8
  C --> UC9
  C --> UC10
  C --> UC11

  UC4 -.->|confirmed PNR only| UC5
  UC9 --> UC10
  UC11 --> UC10
  UC11 -.->|seats full only| UC11
```

**Notes**

- `Track bus live` extends `Enter PNR` — only when PNR is confirmed for that service (demo: `ST9X2K1` on `EXP-1101`).
- `Sell standing ticket` requires all seats occupied.

---

## 2. Domain class diagram

Core entities and how occupancy is derived.

```mermaid
classDiagram
  direction TB

  class Station {
    +String id
    +String name
  }

  class BusService {
    +String id
    +String routeName
    +String fromStationId
    +String toStationId
    +String departTime
    +String arriveTime
    +int totalSeats
    +List~int~ onlineBookedSeats
    +List~int~ onboardOccupiedSeats
    +int standingCount
    +int seatsLeft()
    +bool isSeatsFull()
    +String occupancyLabel()
  }

  class SeatStatus {
    <<enumeration>>
    free
    occupied
    onlineBooked
  }

  class Booking {
    +String pnr
    +String serviceId
    +bool isConfirmed()
    +bool canTrack(BusService)
  }

  class Ticket {
    <<abstract>>
    +String serviceId
    +double amount
    +DateTime issuedAt
  }

  class SeatedTicket {
    +int seatNumber
  }

  class StandingTicket {
    +int sequence
  }

  class Payment {
    +PaymentMethod method
    +double amount
    +bool confirmed
  }

  class PaymentMethod {
    <<enumeration>>
    cash
    upi
  }

  class TripStore {
    +List~int~ onboardSeats(serviceId)
    +int standingCount(serviceId)
    +sellSeat(serviceId, seatNumber)
    +sellStanding(serviceId)
    +applyOccupancy(BusService)
  }

  Station "1" --> "0..*" BusService : from
  Station "1" --> "0..*" BusService : to
  BusService "1" --> "1..*" SeatStatus : per seat state
  BusService "1" --> "0..*" SeatedTicket : onboard sales
  BusService "1" --> "0..*" StandingTicket : when full
  Booking "0..1" --> "1" BusService : unlocks track
  SeatedTicket --|> Ticket
  StandingTicket --|> Ticket
  Ticket "1" --> "1" Payment
  Payment --> PaymentMethod
  TripStore ..> BusService : merges onboard + standing
```

**Occupancy rule (derived)**

```
occupied_seats = onlineBookedSeats ∪ onboardOccupiedSeats
seats_left = totalSeats - |occupied_seats|
standing_count = sold standing tickets (only when seats_left = 0)
```

---

## 3. App component diagram

Flutter layers on `main` / `code-file` (logical, not deployment).

```mermaid
flowchart TB
  subgraph presentation["Presentation"]
    APP[SeatlyApp\nbottom tabs]
    PH[PassengerHomeScreen]
    SD[ServiceDetailScreen]
    TR[TrackScreen]
    CH[ConductorHomeScreen]
    TD[TripDetailScreen]
    PS[PaymentSheet]
    SG[SeatGrid]
    OL[OccupancyLabel]
  end

  subgraph state["State (Riverpod)"]
    FP[fromStationProvider]
    TP[toStationProvider]
    SP[filteredServicesProvider]
    CP[conductorTripsProvider]
    PP[demoPnrProvider]
  end

  subgraph domain["Domain & data"]
    DD[demo_data\nstations + services]
    TS[TripStore\nHive persistence]
  end

  APP --> PH
  APP --> CH
  PH --> SD
  SD --> TR
  CH --> TD
  TD --> SG
  TD --> PS
  PH --> OL
  SD --> OL

  PH --> FP
  PH --> TP
  PH --> SP
  SD --> PP
  CH --> CP
  TD --> CP
  TD --> TS

  SP --> DD
  SP --> TS
  CP --> DD
  CP --> TS
```

---

## 4. Passenger activity diagram

```mermaid
flowchart TD
  Start([Open Passenger tab]) --> PickFrom[Pick From station]
  PickFrom --> PickTo[Pick To station]
  PickTo --> Valid{From ≠ To?}
  Valid -->|No| ShowError[Show validation message]
  Valid -->|Yes| Filter[Filter services for route]
  Filter --> List[Show list:\ntimes + occupancy label]
  List --> Detail[Open service detail]
  Detail --> PNR{Enter PNR}
  PNR --> Check{PNR confirmed\nfor this service?}
  Check -->|Yes| Track[Enable Track bus\nshow demo live map]
  Check -->|No| InfoOnly[Show timing +\navailability only]
  Track --> End([Done])
  InfoOnly --> End
  ShowError --> PickFrom
```

---

## 5. Conductor activity diagram

```mermaid
flowchart TD
  Start([Open Conductor tab]) --> Trips[List sample trips]
  Trips --> Select[Select trip]
  Select --> Grid[Show seat grid\nfree / occupied / online booked]
  Grid --> Tap{User action}
  Tap -->|Tap free seat| PaySeat[Open payment sheet\nseat ticket]
  Tap -->|Standing button| FullCheck{All seats full?}
  FullCheck -->|No| Disabled[Standing disabled]
  FullCheck -->|Yes| PayStand[Open payment sheet\nstanding ticket]
  PaySeat --> Method[Cash or UPI confirm]
  PayStand --> Method
  Method --> Persist[TripStore: persist sale]
  Persist --> Update[Refresh occupancy\nonboard or standing +1]
  Update --> Grid
  Disabled --> Grid
```

---

## 6. Sequence diagram — sell seated ticket

Conductor taps a free seat through payment to updated occupancy.

```mermaid
sequenceDiagram
  actor Conductor
  participant TD as TripDetailScreen
  participant SG as SeatGrid
  participant PS as PaymentSheet
  participant TS as TripStore
  participant Hive as Hive box

  Conductor->>TD: Open trip
  TD->>SG: Render seat map
  Conductor->>SG: Tap free seat N
  SG->>PS: Show payment (UPI / Cash)
  Conductor->>PS: Confirm payment
  PS->>TS: sellSeat(serviceId, N)
  TS->>Hive: put onboard seats list
  TS-->>TD: invalidate / refresh
  TD->>SG: Seat N → occupied
  Note over TD,SG: Passenger view updates<br/>on next provider read
```

---

## 7. Sequence diagram — passenger track gate

Track is conditional on confirmed PNR.

```mermaid
sequenceDiagram
  actor Passenger
  participant SD as ServiceDetailScreen
  participant Prov as demoPnrProvider
  participant TR as TrackScreen

  Passenger->>SD: Open EXP-1101 detail
  Passenger->>SD: Enter PNR
  SD->>Prov: Update PNR state
  SD->>SD: canTrackWithPnr(pnr, service)
  alt PNR = ST9X2K1 and service = EXP-1101
    SD->>Passenger: Enable Track button
    Passenger->>TR: Open live track (demo map)
  else Invalid or wrong service
    SD->>Passenger: Track disabled\navailability only
  end
```

---

## 8. State diagram — seat on a trip

```mermaid
stateDiagram-v2
  [*] --> Free : seat empty
  Free --> OnlineBooked : pre-sold online
  Free --> Occupied : conductor sells onboard
  OnlineBooked --> OnlineBooked : no downgrade
  Occupied --> Occupied : no downgrade
  note right of Free : Tap starts payment
  note right of OnlineBooked : Shown on grid,\nnot tappable
  note right of Occupied : Sold via ETM,\nnot tappable
```

Standing passengers are **not** assigned a seat state; they increment `standingCount` on the `BusService` when all seats are in `OnlineBooked` or `Occupied`.

---

## Diagram index

| # | Diagram | Purpose |
|---|---------|---------|
| 1 | Use case | Who does what |
| 2 | Class | Domain entities & occupancy |
| 3 | Component | Flutter app layers |
| 4 | Passenger activity | Search → detail → track gate |
| 5 | Conductor activity | Seat map → pay → standing |
| 6 | Sequence (seat sale) | ETM ticket issuance |
| 7 | Sequence (track gate) | PNR unlocks map |
| 8 | State (seat) | free / occupied / onlineBooked |

To edit diagrams, change the Mermaid blocks in this file and preview on GitHub or any Mermaid-compatible viewer.
