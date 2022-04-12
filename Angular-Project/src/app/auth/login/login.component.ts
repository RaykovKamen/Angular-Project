import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import {
  MessageBusService,
  MessageType,
} from 'src/app/core/service/message-bus.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';

  loginFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {}

  loginHandler(): void {}

  handleLogin(): void {
    this.errorMessage = '';
    this.authService.login$(this.loginFormGroup.value).subscribe({
      next: () => {
        if (this.activatedRoute.snapshot.queryParams['redirect-to']) {
          this.router.navigateByUrl(
            this.activatedRoute.snapshot.queryParams['redirect-to']
          );
        } else {
          this.router.navigate(['/cart']);
        }

        this.messageBus.notifyForMessage({
          text: 'User successfuly logged in!',
          type: MessageType.Success,
        });
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
