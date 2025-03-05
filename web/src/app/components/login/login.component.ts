import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GraphQlService } from '../../services/graphql.service';
import { catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private graphQlService: GraphQlService, private router: Router) {}

  email = '';
  password = '';
  errorMessage = '';

  login() {
    this.graphQlService
      .login(this.email, this.password)
      .pipe(
        map((result) => {
          const jwt = result?.data?.login;
          if (jwt) {
            localStorage.setItem('token', jwt);
            this.router.navigate(['overview']);
          }
        }),
        catchError((err) => (this.errorMessage = err))
      )
      .subscribe();
  }
}
