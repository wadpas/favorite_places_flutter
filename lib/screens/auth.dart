import 'package:favorite_places_flutter/services/auth.dart';
import 'package:flutter/material.dart';

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = AuthService();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Authentication'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: auth.signInWithGoogle,
          child: const Text('Google acc.'),
        ),
      ),
    );
  }
}
