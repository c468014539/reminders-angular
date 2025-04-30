import { Component } from '@angular/core';
import { GoogleAuthService } from '../google-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: GoogleAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.init(tokens => {
      this.authService.setTokens(tokens);  // « token ‘¶“•?’†
      this.router.navigate(['/main']);
    });
  }

  handleLogin() {
    this.authService.login();
  }
}
