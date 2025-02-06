import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SecurityModule } from './security/security.module';
import { AuthService } from './security/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  get isLoggedIng() {
    return this.authService.isLogged();
  }

  constructor(private readonly authService: AuthService) {}

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}
