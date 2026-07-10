import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';

enum PaymentMethod { cash, upi }

class PaymentSheet extends StatefulWidget {
  const PaymentSheet({
    super.key,
    required this.seatNumber,
    required this.amount,
    required this.onPaid,
  });

  final int? seatNumber;
  final double amount;
  final void Function(PaymentMethod method) onPaid;

  @override
  State<PaymentSheet> createState() => _PaymentSheetState();
}

class _PaymentSheetState extends State<PaymentSheet> {
  PaymentMethod _method = PaymentMethod.upi;

  @override
  Widget build(BuildContext context) {
    final title = widget.seatNumber == null
        ? 'Standing ticket'
        : 'Seat ${widget.seatNumber}';

    return Padding(
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            title,
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 4),
          Text(
            '₹${widget.amount.toStringAsFixed(0)} · Demo payment',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(height: 16),
          SegmentedButton<PaymentMethod>(
            segments: const [
              ButtonSegment(
                value: PaymentMethod.upi,
                label: Text('UPI'),
                icon: Icon(Icons.qr_code),
              ),
              ButtonSegment(
                value: PaymentMethod.cash,
                label: Text('Cash'),
                icon: Icon(Icons.payments_outlined),
              ),
            ],
            selected: {_method},
            onSelectionChanged: (selection) {
              setState(() => _method = selection.first);
            },
          ),
          const SizedBox(height: 16),
          if (_method == PaymentMethod.upi) ...[
            Center(
              child: QrImageView(
                data: 'upi://pay?pa=seatly.demo@upi&pn=Seatly&am=${widget.amount.toStringAsFixed(0)}',
                size: 180,
                backgroundColor: Colors.white,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Scan to pay (simulated). Tap confirm after payment.',
              textAlign: TextAlign.center,
            ),
          ] else
            const Text(
              'Collect cash from passenger, then confirm.',
              textAlign: TextAlign.center,
            ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () {
              widget.onPaid(_method);
              Navigator.of(context).pop();
            },
            child: Text(
              _method == PaymentMethod.upi ? 'Confirm UPI received' : 'Confirm cash',
            ),
          ),
        ],
      ),
    );
  }
}
