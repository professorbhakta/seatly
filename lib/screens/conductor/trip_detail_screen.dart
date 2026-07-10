import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/demo_data.dart';
import '../../models/bus_service.dart';
import '../../providers/app_providers.dart';
import '../../widgets/payment_sheet.dart';
import '../../widgets/seat_grid.dart';

class TripDetailScreen extends ConsumerWidget {
  const TripDetailScreen({super.key, required this.tripId});

  final String tripId;

  BusService? _findTrip(List<BusService> trips) {
    for (final trip in trips) {
      if (trip.id == tripId) {
        return trip;
      }
    }
    return null;
  }

  Future<void> _sellSeat(
    BuildContext context,
    WidgetRef ref,
    BusService trip,
    int seatNumber,
  ) async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (context) => PaymentSheet(
        seatNumber: seatNumber,
        amount: 120,
        onPaid: (_) async {
          final store = await ref.read(tripStoreProvider.future);
          await store.sellSeat(trip.id, seatNumber);
          ref.invalidate(tripStoreProvider);
        },
      ),
    );
  }

  Future<void> _sellStanding(
    BuildContext context,
    WidgetRef ref,
    BusService trip,
  ) async {
    await showModalBottomSheet<void>(
      context: context,
      isScrollControlled: true,
      builder: (context) => PaymentSheet(
        seatNumber: null,
        amount: 80,
        onPaid: (_) async {
          final store = await ref.read(tripStoreProvider.future);
          await store.sellStanding(trip.id);
          ref.invalidate(tripStoreProvider);
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final trips = ref.watch(conductorTripsProvider);
    final trip = _findTrip(trips);

    if (trip == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('Trip')),
        body: const Center(child: Text('Trip not found')),
      );
    }

    final from = stationById(trip.fromStationId).name;
    final to = stationById(trip.toStationId).name;

    return Scaffold(
      appBar: AppBar(title: Text(trip.id)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            '$from → $to',
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 4),
          Text('Depart ${trip.departTime} · ${trip.occupancyLabel}'),
          const SizedBox(height: 16),
          SeatGrid(
            service: trip,
            onSeatTap: (seat) => _sellSeat(context, ref, trip, seat),
          ),
          const SizedBox(height: 20),
          FilledButton.tonalIcon(
            onPressed: trip.isSeatsFull
                ? () => _sellStanding(context, ref, trip)
                : null,
            icon: const Icon(Icons.accessibility_new),
            label: Text(
              trip.isSeatsFull
                  ? 'Sell standing ticket (${trip.standingCount} sold)'
                  : 'Standing sales unlock when seats are full',
            ),
          ),
        ],
      ),
    );
  }
}
