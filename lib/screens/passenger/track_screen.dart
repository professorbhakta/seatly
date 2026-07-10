import 'package:flutter/material.dart';

import '../../data/demo_data.dart';
import '../../models/bus_service.dart';

class TrackScreen extends StatelessWidget {
  const TrackScreen({super.key, required this.service});

  final BusService service;

  @override
  Widget build(BuildContext context) {
    final from = stationById(service.fromStationId).name;
    final to = stationById(service.toStationId).name;

    return Scaffold(
      appBar: AppBar(title: const Text('Live track')),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              '${service.id} · $from → $to',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            const Text(
              'Demo live map — real GPS integration comes later. '
              'Track is shown only because PNR ST9X2K1 matches this service.',
            ),
            const SizedBox(height: 24),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: Theme.of(context).colorScheme.outlineVariant,
                  ),
                ),
                child: Stack(
                  children: [
                    Center(
                      child: Icon(
                        Icons.route,
                        size: 96,
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    Positioned(
                      left: 24,
                      bottom: 24,
                      child: _MapPin(
                        label: from,
                        color: Theme.of(context).colorScheme.secondary,
                      ),
                    ),
                    Positioned(
                      right: 24,
                      top: 48,
                      child: _MapPin(
                        label: 'En route (demo)',
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                    Positioned(
                      right: 24,
                      bottom: 24,
                      child: _MapPin(
                        label: to,
                        color: Theme.of(context).colorScheme.tertiary,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Estimated arrival: ${service.arriveTime}',
              style: Theme.of(context).textTheme.titleMedium,
            ),
          ],
        ),
      ),
    );
  }
}

class _MapPin extends StatelessWidget {
  const _MapPin({required this.label, required this.color});

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.directions_bus, color: color, size: 28),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
      ],
    );
  }
}
