import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN_URL } from './api-url.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
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
        window.localStorage.setItem('auth', JSON.stringify(auth));
        return o.next(auth);
      });
    });
  }

  constructor() { }
}
