import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxMaskConfig, provideEnvironmentNgxMask } from 'ngx-mask';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthService } from './security/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { authTokenInterceptor } from './interceptors/authTokenInterceptor';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token'),
          allowedDomains: [/localhost:8080/],
          disallowedRoutes: [/\/oauth2\/token/],
        },
      })
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authTokenInterceptor])
    ),
    provideEnvironmentNgxMask(),
    AuthService,
  ],
};
