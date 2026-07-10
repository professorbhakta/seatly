class BusService {
  const BusService({
    required this.id,
    required this.routeName,
    required this.fromStationId,
    required this.toStationId,
    required this.departTime,
    required this.arriveTime,
    required this.totalSeats,
    required this.onlineBookedSeats,
    this.onboardOccupiedSeats = const [],
    this.standingCount = 0,
  });

  final String id;
  final String routeName;
  final String fromStationId;
  final String toStationId;
  final String departTime;
  final String arriveTime;
  final int totalSeats;
  final List<int> onlineBookedSeats;
  final List<int> onboardOccupiedSeats;
  final int standingCount;

  int get occupiedSeatCount =>
      {...onlineBookedSeats, ...onboardOccupiedSeats}.length;

  int get seatsLeft => totalSeats - occupiedSeatCount;

  bool get isSeatsFull => seatsLeft <= 0;

  String get occupancyLabel {
    if (seatsLeft > 0) {
      return '$seatsLeft seats left';
    }
    return 'Seats full · $standingCount standing';
  }

  BusService copyWith({
    List<int>? onboardOccupiedSeats,
    int? standingCount,
  }) {
    return BusService(
      id: id,
      routeName: routeName,
      fromStationId: fromStationId,
      toStationId: toStationId,
      departTime: departTime,
      arriveTime: arriveTime,
      totalSeats: totalSeats,
      onlineBookedSeats: onlineBookedSeats,
      onboardOccupiedSeats: onboardOccupiedSeats ?? this.onboardOccupiedSeats,
      standingCount: standingCount ?? this.standingCount,
    );
  }
}

enum SeatStatus { free, occupied, onlineBooked }
