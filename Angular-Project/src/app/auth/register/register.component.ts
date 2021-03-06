import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { MessageBusService, MessageType } from 'src/app/core/service/message-bus.service';
import { CreateUserDto } from 'src/app/core/service/user.service';
import { emailValidator, passwordMatch } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(5),
  ]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl(null, [Validators.required, emailValidator]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl(null, [passwordMatch(this.passwordControl)]),
    }),
    tel: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {}

  handleRegister(): void {
    const { username, email, passwords, tel } = this.registerFormGroup.value;

    const body: CreateUserDto = {
      username: username,
      email: email,
      password: passwords.password,
    };
    if (tel) {
      body.tel = tel;
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/login']);
    });

    this.messageBus.notifyForMessage({
      text: 'User successfuly registered!',
      type: MessageType.Success,
    });
  }
}
