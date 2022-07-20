import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]],
      password: [null, [
        Validators.required,
        Validators.minLength(3)
      ]],
      passwordConfirmation: [null, [Validators.required]]
    });
  }

  onSubmit(){
    if (this.registerForm.invalid) { return; }
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.route.navigate(['login']))
    ).subscribe();
  }

}
