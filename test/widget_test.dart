import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:seatly/app.dart';

void main() {
  testWidgets('Seatly app shows Passenger and Conductor tabs', (tester) async {
    await tester.pumpWidget(const ProviderScope(child: SeatlyApp()));
    await tester.pumpAndSettle();

    expect(find.text('Passenger'), findsWidgets);
    expect(find.text('Conductor'), findsWidgets);
    expect(find.text('Asaan sawari — know before you board'), findsOneWidget);
  });
}
