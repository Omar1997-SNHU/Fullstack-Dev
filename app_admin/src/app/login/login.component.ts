import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLoginSubmit(): void {
    const user: User = {
      _id: '',
      email: this.credentials.email,
      name: this.credentials.name
    };

    this.authService.login(user, this.credentials.password).subscribe({
      next: (authResp) => {
        this.authService.saveToken(authResp.token);
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}