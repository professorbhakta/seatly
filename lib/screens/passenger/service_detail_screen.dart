import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/demo_data.dart';
import '../../models/bus_service.dart';
import '../../providers/app_providers.dart';
import '../../widgets/occupancy_label.dart';
import 'track_screen.dart';

class ServiceDetailScreen extends ConsumerWidget {
  const ServiceDetailScreen({super.key, required this.service});

  final BusService service;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pnr = ref.watch(demoPnrProvider);
    final canTrack = canTrackWithPnr(pnr, service);
    final from = stationById(service.fromStationId).name;
    final to = stationById(service.toStationId).name;

    return Scaffold(
      appBar: AppBar(title: Text(service.id)),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            service.routeName,
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 8),
          Text('$from → $to'),
          const SizedBox(height: 4),
          Text('Depart ${service.departTime} · Arrive ${service.arriveTime}'),
          const SizedBox(height: 12),
          OccupancyLabel(service: service),
          const SizedBox(height: 24),
          Text(
            'Live track (confirmed booking only)',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          TextField(
            decoration: const InputDecoration(
              labelText: 'PNR / booking reference',
              hintText: 'Try demo PNR: ST9X2K1',
              border: OutlineInputBorder(),
            ),
            onChanged: (value) =>
                ref.read(demoPnrProvider.notifier).state = value,
          ),
          const SizedBox(height: 8),
          Text(
            canTrack
                ? 'Booking confirmed — live track available for this service.'
                : 'Enter a confirmed PNR to unlock live track. '
                    'Without confirmation, only line-up and availability are shown.',
            style: Theme.of(context).textTheme.bodySmall,
          ),
          const SizedBox(height: 12),
          FilledButton.icon(
            onPressed: canTrack
                ? () {
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (_) => TrackScreen(service: service),
                      ),
                    );
                  }
                : null,
            icon: const Icon(Icons.map_outlined),
            label: const Text('Track bus'),
          ),
        ],
      ),
    );
  }
}
