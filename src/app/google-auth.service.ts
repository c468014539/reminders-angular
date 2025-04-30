import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private tokenClient: any;
  private tokens: any;

  init(onTokenReady: (tokens: any) => void) {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleLogin(onTokenReady);
    };
    document.body.appendChild(script);
  }

  private initializeGoogleLogin(onTokenReady: (tokens: any) => void) {
    const gsi = (window as any).google;
    gsi.accounts.id.initialize({
      client_id: '817801727317-2hktvei50tlr0sou8klf53a2cf4tkjak.apps.googleusercontent.com',
      callback: (response: any) => {
        const id_token = response.credential;
        const decoded = this.decodeJwt(id_token);

        console.log('? ìo?ê¨å˜', decoded);

        this.tokenClient = gsi.accounts.oauth2.initTokenClient({
          client_id: '817801727317-2hktvei50tlr0sou8klf53a2cf4tkjak.apps.googleusercontent.com',
          scope: 'openid email profile https://www.googleapis.com/auth/drive',
          prompt: '',
          callback: (tokenResponse: any) => {
            const access_token = tokenResponse.access_token;
            console.log('? ù\ìû access_token', access_token);
            const tokens = {
              Authorization: `Bearer ${id_token}`,
              'X-Access-Token': access_token
            };
            onTokenReady(tokens);
          }
        });

        this.tokenClient.requestAccessToken();
      }
    });

    gsi.accounts.id.renderButton(
      document.getElementById('g_id_login_btn'),
      { theme: 'outline', size: 'large' }
    );
  }

  login() {
    if (this.tokenClient) {
      this.tokenClient.requestAccessToken();
    }
  }

  private decodeJwt(token: string) {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(escape(atob(base64))));
  }

  setTokens(tokens: any) {
    this.tokens = tokens;
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  }
  
  getTokens(): any {
    if (!this.tokens) {
      const raw = localStorage.getItem('auth_tokens');
      if (raw) {
        this.tokens = JSON.parse(raw);
      }
    }
    return this.tokens;
  }
}
