import 'package:flutter_test/flutter_test.dart';
import 'package:seatly/data/demo_data.dart';
import 'package:seatly/models/bus_service.dart';

void main() {
  group('demo data', () {
    test('services filter by from/to stations', () {
      final results = servicesForRoute('amd', 'vad');
      expect(results.length, 1);
      expect(results.first.id, 'EXP-1101');
    });

    test('demo PNR unlocks track only for EXP-1101', () {
      final service = demoServices.firstWhere((s) => s.id == 'EXP-1101');
      expect(canTrackWithPnr('ST9X2K1', service), isTrue);
      expect(canTrackWithPnr('st9x2k1', service), isTrue);
      expect(canTrackWithPnr('WRONG', service), isFalse);

      final other = demoServices.firstWhere((s) => s.id == 'ORD-2204');
      expect(canTrackWithPnr('ST9X2K1', other), isFalse);
    });
  });

  group('BusService occupancy', () {
    const service = BusService(
      id: 'TEST',
      routeName: 'Test',
      fromStationId: 'amd',
      toStationId: 'vad',
      departTime: '10:00',
      arriveTime: '12:00',
      totalSeats: 4,
      onlineBookedSeats: [1, 2],
      onboardOccupiedSeats: [3, 4],
      standingCount: 2,
    );

    test('reports seats full with standing count', () {
      expect(service.seatsLeft, 0);
      expect(service.isSeatsFull, isTrue);
      expect(service.occupancyLabel, 'Seats full · 2 standing');
    });
  });
}
