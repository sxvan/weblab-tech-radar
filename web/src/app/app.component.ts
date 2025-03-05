import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'tech-radar';

  navigate(url: string) {
    this.router.navigateByUrl(url);
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  signOut() {
    localStorage.clear();
    window.location.reload();
  }
}
