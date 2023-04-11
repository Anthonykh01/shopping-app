import { Component } from '@angular/core';
import { AuthService, FirebaseError } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private authService: AuthService) {}

  async register() {
    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      console.error("Invalid email format.");
      return;
    }

    if (this.password !== this.confirmPassword) {
      console.error("Passwords don't match.");
      return;
    }

    if (this.password.length < 6) {
      console.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      const result = await this.authService.register(this.email, this.password);
      console.log(result);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message || error.code);
      } else {
        console.error('An unknown error occurred.');
      }
    }
  }
}
