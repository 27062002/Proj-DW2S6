import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(): MaybeAsync<GuardResult> {
    const isLogged = this.authService.isLogged();

    if (!isLogged) {
      this.authService.login();
    }

    return isLogged;
  }
}
