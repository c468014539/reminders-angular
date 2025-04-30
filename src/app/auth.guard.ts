import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { GoogleAuthService } from './google-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: GoogleAuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const tokens = this.authService.getTokens();
    if (tokens) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
