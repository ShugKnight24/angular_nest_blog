import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface JWTToken {
  access_token: string;
}

interface LoginForm {
  email: string;
  password: string;
};

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  role?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginForm: LoginForm) {
    return this.http.post<any>('/api/users/login', {
      email: loginForm.email,
      password: loginForm.password
    }).pipe(
      map((jwtToken: JWTToken) => {
        if (jwtToken) {
          localStorage.setItem('blog_jwt_token', jwtToken.access_token);
          return jwtToken;
        }
        return;
      })
    );
  }

  register(user: User) {
    return this.http.post<any>('/api/users/', user).pipe(
      map(user => user)
    );
  }
}
