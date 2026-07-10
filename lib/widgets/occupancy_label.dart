import 'package:flutter/material.dart';

import '../models/bus_service.dart';

class OccupancyLabel extends StatelessWidget {
  const OccupancyLabel({super.key, required this.service});

  final BusService service;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    final isFull = service.isSeatsFull;
    final background = isFull
        ? colorScheme.errorContainer
        : colorScheme.primaryContainer;
    final foreground =
        isFull ? colorScheme.onErrorContainer : colorScheme.onPrimaryContainer;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        service.occupancyLabel,
        style: TextStyle(
          color: foreground,
          fontWeight: FontWeight.w600,
          fontSize: 12,
        ),
      ),
    );
  }
}
