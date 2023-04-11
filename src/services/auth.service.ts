import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Add the FirebaseError class
export class FirebaseError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      // Add a type assertion for the error object
      throw new FirebaseError((error as FirebaseError).message, (error as FirebaseError).code);
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
      // Add a type assertion for the error object
      throw new FirebaseError((error as FirebaseError).message, (error as FirebaseError).code);
    }
  }
}
