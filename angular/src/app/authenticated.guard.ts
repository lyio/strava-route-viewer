import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isAuthenticated: boolean = this.authenticationService.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    }

    return isAuthenticated;
  }
}
