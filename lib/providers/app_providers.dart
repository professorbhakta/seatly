import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/demo_data.dart';
import '../data/trip_store.dart';
import '../models/bus_service.dart';
import '../models/station.dart';

final tripStoreProvider = FutureProvider<TripStore>((ref) async {
  return TripStore.open();
});

final fromStationProvider = StateProvider<Station?>((ref) => null);
final toStationProvider = StateProvider<Station?>((ref) => null);
final demoPnrProvider = StateProvider<String>((ref) => '');

final filteredServicesProvider = Provider<List<BusService>>((ref) {
  final from = ref.watch(fromStationProvider);
  final to = ref.watch(toStationProvider);
  final storeAsync = ref.watch(tripStoreProvider);

  final base = servicesForRoute(from?.id, to?.id);
  return storeAsync.maybeWhen(
    data: (store) => store.applyAll(base),
    orElse: () => base,
  );
});

final conductorTripsProvider = Provider<List<BusService>>((ref) {
  final storeAsync = ref.watch(tripStoreProvider);
  return storeAsync.maybeWhen(
    data: (store) => store.applyAll(demoServices),
    orElse: () => demoServices,
  );
});

final selectedTripProvider = StateProvider<BusService?>((ref) => null);

final refreshTripsProvider = Provider<void Function()>((ref) {
  return () {
    ref.invalidate(tripStoreProvider);
  };
});
