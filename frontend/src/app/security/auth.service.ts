import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  oauthUrl = process.env['NG_APP_OAUTH_URL'];
  redirectUrl = `${process.env['NG_APP_APP_DOMAIN']}/authorized`;
  jwtPayload: any;
  codeVerifier = 'desafio123';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login() {
    const challengeMethod = 'S256';
    const codeChallenge = 'hZSegNfnAKeSp4viKw9gAt_GYZkKUrvx_6KfxX_u0q4';

    const redirectURI = encodeURIComponent(this.redirectUrl);

    const clientId = 'angular';
    const scope = 'read write';
    const responseType = 'code';

    const params = [
      'response_type=' + responseType,
      'client_id=' + clientId,
      'scope=' + scope,
      'code_challenge=' + codeChallenge,
      'code_challenge_method=' + challengeMethod,
      'redirect_uri=' + redirectURI,
    ];

    window.location.href = `${this.oauthUrl}/authorize?${params.join('&')}`;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getNewAccessTokenWithCode(code: string) {
    const payload = new HttpParams()
      .append('grant_type', 'authorization_code')
      .append('code', code)
      .append('redirect_uri', this.redirectUrl)
      .append('code_verifier', this.codeVerifier);

    const headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded')
      .append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    return this.http
      .post<{ access_token: string; refresh_token: string }>(
        `${this.oauthUrl}/token`,
        payload,
        { headers }
      )
      .pipe(
        tap((payload) => {
          this.storeToken(payload.access_token);
          this.storeRefreshToken(payload.refresh_token);
        })
      );
  }

  public storeToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private storeRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  isLogged() {
    const token = localStorage.getItem('token');
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}
