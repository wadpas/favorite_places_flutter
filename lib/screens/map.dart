import 'package:favorite_places_flutter/models/place.dart';
import 'package:flutter/material.dart';

class MapScreen extends StatefulWidget {
  const MapScreen(
      {super.key,
      this.location = const PlaceLocation(
          latitude: 37.422, longitude: -122.084, adrress: '')});

  final PlaceLocation location;

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
