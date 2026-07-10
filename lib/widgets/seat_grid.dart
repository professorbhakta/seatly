import 'package:flutter/material.dart';

import '../models/bus_service.dart';

class SeatGrid extends StatelessWidget {
  const SeatGrid({
    super.key,
    required this.service,
    required this.onSeatTap,
  });

  final BusService service;
  final void Function(int seatNumber) onSeatTap;

  SeatStatus seatStatus(int seatNumber) {
    if (service.onlineBookedSeats.contains(seatNumber)) {
      return SeatStatus.onlineBooked;
    }
    if (service.onboardOccupiedSeats.contains(seatNumber)) {
      return SeatStatus.occupied;
    }
    return SeatStatus.free;
  }

  Color _color(BuildContext context, SeatStatus status) {
    final scheme = Theme.of(context).colorScheme;
    return switch (status) {
      SeatStatus.free => scheme.secondaryContainer,
      SeatStatus.occupied => scheme.error,
      SeatStatus.onlineBooked => scheme.tertiary,
    };
  }

  Color _textColor(BuildContext context, SeatStatus status) {
    final scheme = Theme.of(context).colorScheme;
    return switch (status) {
      SeatStatus.free => scheme.onSecondaryContainer,
      SeatStatus.occupied => scheme.onError,
      SeatStatus.onlineBooked => scheme.onTertiary,
    };
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            _legend(context, 'Free', _color(context, SeatStatus.free)),
            _legend(context, 'Onboard', _color(context, SeatStatus.occupied)),
            _legend(
              context,
              'Online booked',
              _color(context, SeatStatus.onlineBooked),
            ),
          ],
        ),
        const SizedBox(height: 16),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
            mainAxisSpacing: 8,
            crossAxisSpacing: 8,
            childAspectRatio: 1.1,
          ),
          itemCount: service.totalSeats,
          itemBuilder: (context, index) {
            final seatNumber = index + 1;
            final status = seatStatus(seatNumber);
            final isFree = status == SeatStatus.free;

            return Material(
              color: _color(context, status),
              borderRadius: BorderRadius.circular(8),
              child: InkWell(
                borderRadius: BorderRadius.circular(8),
                onTap: isFree ? () => onSeatTap(seatNumber) : null,
                child: Center(
                  child: Text(
                    '$seatNumber',
                    style: TextStyle(
                      color: _textColor(context, status),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _legend(BuildContext context, String label, Color color) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 14,
          height: 14,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(3),
          ),
        ),
        const SizedBox(width: 6),
        Text(label, style: Theme.of(context).textTheme.bodySmall),
      ],
    );
  }
}
