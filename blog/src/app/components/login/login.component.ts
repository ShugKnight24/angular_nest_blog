import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth-service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  onSubmit(){
    if (this.loginForm.invalid){ return; }

    this.authService.login(this.loginForm.value).pipe(
      map(jwtToken => this.router.navigate(['admin']))
    ).subscribe();
  }

}
