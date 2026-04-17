import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { Storage } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {}

  public login(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthApiCall('login', user, password);
  }

  public register(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthApiCall('register', user, password);
  }

  private handleAuthApiCall(
    endpoint: string,
    user: User,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `http://localhost:3000/api/${endpoint}`,
      {
        name: user.name,
        email: user.email,
        password
      }
    );
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }

  public getCurrentUser(): User | null {
    if (!this.isLoggedIn()) return null;
    const token = this.getToken()!;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      _id: payload._id,
      email: payload.email,
      name: payload.name
    };
  }
}