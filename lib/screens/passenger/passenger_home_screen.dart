import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/demo_data.dart';
import '../../models/station.dart';
import '../../providers/app_providers.dart';
import '../../widgets/occupancy_label.dart';
import 'service_detail_screen.dart';

class PassengerHomeScreen extends ConsumerWidget {
  const PassengerHomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final from = ref.watch(fromStationProvider);
    final to = ref.watch(toStationProvider);
    final services = ref.watch(filteredServicesProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Passenger')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(
            'Asaan sawari — know before you board',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 16),
          _StationPicker(
            label: 'From',
            value: from,
            exclude: to,
            onChanged: (station) =>
                ref.read(fromStationProvider.notifier).state = station,
          ),
          const SizedBox(height: 12),
          _StationPicker(
            label: 'To',
            value: to,
            exclude: from,
            onChanged: (station) =>
                ref.read(toStationProvider.notifier).state = station,
          ),
          const SizedBox(height: 20),
          Text(
            'Services',
            style: Theme.of(context).textTheme.titleMedium,
          ),
          const SizedBox(height: 8),
          if (from == null || to == null)
            const Text('Pick From and To stations to see line-up.')
          else if (from.id == to.id)
            const Text('From and To must be different stations.')
          else if (services.isEmpty)
            const Text('No services found for this route (demo data).')
          else
            ...services.map(
              (service) => Card(
                margin: const EdgeInsets.only(bottom: 10),
                child: ListTile(
                  title: Text('${service.id} · ${service.routeName}'),
                  subtitle: Text(
                    '${service.departTime} → ${service.arriveTime}',
                  ),
                  trailing: OccupancyLabel(service: service),
                  onTap: () {
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (_) => ServiceDetailScreen(service: service),
                      ),
                    );
                  },
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class _StationPicker extends StatelessWidget {
  const _StationPicker({
    required this.label,
    required this.value,
    required this.exclude,
    required this.onChanged,
  });

  final String label;
  final Station? value;
  final Station? exclude;
  final ValueChanged<Station?> onChanged;

  @override
  Widget build(BuildContext context) {
    final options = stations.where((station) => station.id != exclude?.id);

    return InputDecorator(
      decoration: InputDecoration(
        labelText: label,
        border: const OutlineInputBorder(),
      ),
      child: DropdownButtonHideUnderline(
        child: DropdownButton<Station>(
          isExpanded: true,
          value: value,
          hint: Text('Select $label station'),
          items: options
              .map(
                (station) => DropdownMenuItem(
                  value: station,
                  child: Text(station.name),
                ),
              )
              .toList(),
          onChanged: onChanged,
        ),
      ),
    );
  }
}
