import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AuthenticationService } from 'src/app/services/authentication.service';
import StringUtils from 'src/app/utils/string.utils';

class CustomValidators {
  static passwordContainsNumber(
    control: AbstractControl
  ): ValidationErrors | void {
    const password = control.value;

    if (StringUtils.stringContainsNumber(password)) {
      return;
    } else {
      return {
        passwordDoesntContainNumber: true
      }
    }
  }

  static passwordContainsSpecialCharacter(
    control: AbstractControl
  ): ValidationErrors | void {
    const password = control.value;

    if (StringUtils.stringContainsSpecialCharacter(password)) {
      return;
    } else {
      return {
        passwordDoesntContainSpecialCharacter: true
      }
    }
  }

  static passwordContainsUppercase(
    control: AbstractControl
  ): ValidationErrors | void {
    const password = control.value;

    if (StringUtils.stringContainsUppercase(password)) {
      return;
    } else {
      return {
        passwordDoesntContainUppercase: true
      };
    }
  }

  static passwordLength(
    control: AbstractControl
  ) : ValidationErrors | void {
    const password = control.value;

    if (password !== null && password.length >= 3) {
      return;
    } else {
      return { passwordLength: true };
    }
  }

  static passwordMatch(
    control: AbstractControl
  ): ValidationErrors | void {
    const password = control.get('password')?.value;
    const passwordConfirmation = control.get('passwordConfirmation')?.value;

    if (
      (password !== null && passwordConfirmation !== null) &&
      password === passwordConfirmation
    ) {
      return;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}

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
        CustomValidators.passwordContainsNumber,
        CustomValidators.passwordContainsSpecialCharacter,
        CustomValidators.passwordContainsUppercase,
        CustomValidators.passwordLength
      ]],
      passwordConfirmation: [null, [Validators.required]]
    }, {
      validator: CustomValidators.passwordMatch
    });
  }

  onSubmit(){
    if (this.registerForm.invalid) { return; }
    this.authService.register(this.registerForm.value).pipe(
      map(user => this.route.navigate(['login']))
    ).subscribe();
  }

}
