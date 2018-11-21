import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from './model/configuration';
import { CONFIG_URL } from './api-url.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigApiService {
  constructor() { }

  getConfiguration(): Observable<Configuration>{
    return new Observable<Configuration>(o => {
      fetch(CONFIG_URL, { mode: 'cors'})
        .then(response => response.json())
        .then(c => o.next(c));
    });
  }
}
