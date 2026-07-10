import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/demo_data.dart';
import '../../providers/app_providers.dart';
import 'trip_detail_screen.dart';

class ConductorHomeScreen extends ConsumerWidget {
  const ConductorHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final trips = ref.watch(conductorTripsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Conductor ETM')),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: trips.length + 1,
        separatorBuilder: (_, _) => const SizedBox(height: 8),
        itemBuilder: (context, index) {
          if (index == 0) {
            return Text(
              'Seat map first · tap to sell',
              style: Theme.of(context).textTheme.bodyMedium,
            );
          }
          final trip = trips[index - 1];
          final from = stationById(trip.fromStationId).name;
          final to = stationById(trip.toStationId).name;

          return Card(
            child: ListTile(
              title: Text('${trip.id} · $from → $to'),
              subtitle: Text(
                '${trip.departTime} · ${trip.occupancyLabel}',
              ),
              trailing: const Icon(Icons.chevron_right),
              onTap: () {
                ref.read(selectedTripProvider.notifier).state = trip;
                Navigator.of(context).push(
                  MaterialPageRoute<void>(
                    builder: (_) => TripDetailScreen(tripId: trip.id),
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
