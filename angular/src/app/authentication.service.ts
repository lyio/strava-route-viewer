import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN_URL } from './api-url.constants';
import { Auth } from './model/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly AUTH_KEY = 'auth';

  getToken(code: string): Observable<any> {
    const data: Object = {
      code
    };
    return new Observable<any>(o => {
      fetch(TOKEN_URL, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(auth => {
        this.setUser(auth);
        return o.next(auth);
      });
    });
  }

  setUser(auth: Auth): void {
    window.localStorage.setItem(this.AUTH_KEY, JSON.stringify(auth));
  }

  isAuthenticated(): boolean {
    const user: Auth = JSON.parse(window.localStorage.getItem(this.AUTH_KEY));
    const dateInSeconds: number = Math.floor(Date.now() / 1000);

    return user && user.accessToken !== null && user.expiresAt > dateInSeconds;
  }

  getUser(): Auth {
    return JSON.parse(window.localStorage.getItem(this.AUTH_KEY));
  }

  logout() {
    window.localStorage.removeItem(this.AUTH_KEY);
  }

  constructor() { }
}
