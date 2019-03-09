import { Component } from '@angular/core'
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private auth: AuthService){

  }

  ngOnInit(): void {
    this.auth.checkAuthenticationStatus();
  }
}
