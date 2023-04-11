import { Component } from '@angular/core';
import { AuthService, FirebaseError } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  async login() {
    // Check if email is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      console.error("Invalid email format.");
      return;
    }

    try {
      const result = await this.authService.login(this.email, this.password);
      console.log(result);
      // Redirect to a different page after successful login, e.g., dashboard
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message || error.code);
      } else {
        console.error('An unknown error occurred.');
      }
    }
  }
}
