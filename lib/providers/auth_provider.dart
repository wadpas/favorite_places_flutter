import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final authStateChangesProvider = StreamProvider.autoDispose<User?>((ref) {
  // get FirebaseAuth from the provider below
  final firebaseAuth = ref.watch(firebaseAuthProvider);
  // call a method that returns a Stream<User?>
  return firebaseAuth.authStateChanges();
});

// provider to access the FirebaseAuth instance
final firebaseAuthProvider = Provider<FirebaseAuth>((ref) {
  return FirebaseAuth.instance;
});
