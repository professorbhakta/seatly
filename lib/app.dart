import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'screens/conductor/conductor_home_screen.dart';
import 'screens/passenger/passenger_home_screen.dart';

class SeatlyApp extends ConsumerWidget {
  const SeatlyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp(
      title: 'Seatly',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0B6E4F),
          brightness: Brightness.light,
        ),
        useMaterial3: true,
      ),
      home: const _HomeShell(),
    );
  }
}

class _HomeShell extends StatefulWidget {
  const _HomeShell();

  @override
  State<_HomeShell> createState() => _HomeShellState();
}

class _HomeShellState extends State<_HomeShell> {
  int _index = 0;

  static const _tabs = [
    NavigationDestination(
      icon: Icon(Icons.person_outline),
      selectedIcon: Icon(Icons.person),
      label: 'Passenger',
    ),
    NavigationDestination(
      icon: Icon(Icons.confirmation_number_outlined),
      selectedIcon: Icon(Icons.confirmation_number),
      label: 'Conductor',
    ),
  ];

  static const _screens = [
    PassengerHomeScreen(),
    ConductorHomeScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_index],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _index,
        destinations: _tabs,
        onDestinationSelected: (index) => setState(() => _index = index),
      ),
    );
  }
}
