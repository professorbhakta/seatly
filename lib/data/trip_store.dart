import 'package:hive_flutter/hive_flutter.dart';

import '../models/bus_service.dart';

const _boxName = 'trip_occupancy';

class TripStore {
  TripStore(this._box);

  final Box<dynamic> _box;

  static Future<TripStore> open() async {
    await Hive.initFlutter();
    final box = await Hive.openBox<dynamic>(_boxName);
    return TripStore(box);
  }

  String _onboardKey(String serviceId) => '${serviceId}_onboard';
  String _standingKey(String serviceId) => '${serviceId}_standing';

  List<int> onboardSeats(String serviceId) {
    final raw = _box.get(_onboardKey(serviceId), defaultValue: <int>[]);
    return List<int>.from(raw as List);
  }

  int standingCount(String serviceId) {
    return _box.get(_standingKey(serviceId), defaultValue: 0) as int;
  }

  Future<void> sellSeat(String serviceId, int seatNumber) async {
    final seats = onboardSeats(serviceId);
    if (seats.contains(seatNumber)) {
      return;
    }
    seats.add(seatNumber);
    await _box.put(_onboardKey(serviceId), seats);
  }

  Future<void> sellStanding(String serviceId) async {
    final count = standingCount(serviceId) + 1;
    await _box.put(_standingKey(serviceId), count);
  }

  BusService applyOccupancy(BusService service) {
    return service.copyWith(
      onboardOccupiedSeats: onboardSeats(service.id),
      standingCount: standingCount(service.id),
    );
  }

  List<BusService> applyAll(List<BusService> services) {
    return services.map(applyOccupancy).toList();
  }
}
