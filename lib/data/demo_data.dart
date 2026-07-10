import '../models/bus_service.dart';
import '../models/station.dart';

const demoPnr = 'ST9X2K1';
const trackableServiceId = 'EXP-1101';

const stations = <Station>[
  Station(id: 'amd', name: 'Ahmedabad'),
  Station(id: 'vad', name: 'Vadodara'),
  Station(id: 'srt', name: 'Surat'),
  Station(id: 'rjk', name: 'Rajkot'),
  Station(id: 'bvn', name: 'Bhavnagar'),
  Station(id: 'jmn', name: 'Jamnagar'),
];

final demoServices = <BusService>[
  const BusService(
    id: 'EXP-1101',
    routeName: 'Ahmedabad Express',
    fromStationId: 'amd',
    toStationId: 'vad',
    departTime: '06:30',
    arriveTime: '08:45',
    totalSeats: 40,
    onlineBookedSeats: [1, 2, 3, 4, 5, 6, 7, 8],
  ),
  const BusService(
    id: 'ORD-2204',
    routeName: 'Surat Ordinary',
    fromStationId: 'srt',
    toStationId: 'amd',
    departTime: '09:15',
    arriveTime: '13:00',
    totalSeats: 36,
    onlineBookedSeats: [1, 2, 3, 4, 5],
  ),
  const BusService(
    id: 'EXP-3307',
    routeName: 'Rajkot Express',
    fromStationId: 'rjk',
    toStationId: 'amd',
    departTime: '14:00',
    arriveTime: '18:30',
    totalSeats: 40,
    onlineBookedSeats: [],
  ),
  const BusService(
    id: 'ORD-4412',
    routeName: 'Bhavnagar Ordinary',
    fromStationId: 'bvn',
    toStationId: 'srt',
    departTime: '07:45',
    arriveTime: '12:20',
    totalSeats: 32,
    onlineBookedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  ),
  const BusService(
    id: 'EXP-5520',
    routeName: 'Jamnagar Express',
    fromStationId: 'jmn',
    toStationId: 'rjk',
    departTime: '16:30',
    arriveTime: '19:15',
    totalSeats: 40,
    onlineBookedSeats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  ),
];

Station stationById(String id) =>
    stations.firstWhere((station) => station.id == id);

List<BusService> servicesForRoute(String? fromId, String? toId) {
  if (fromId == null || toId == null || fromId == toId) {
    return const [];
  }
  return demoServices
      .where(
        (service) =>
            service.fromStationId == fromId && service.toStationId == toId,
      )
      .toList();
}

bool canTrackWithPnr(String pnr, BusService service) {
  return pnr.trim().toUpperCase() == demoPnr &&
      service.id == trackableServiceId;
}
