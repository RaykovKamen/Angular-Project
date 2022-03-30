import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './email-validator-directive';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent, EmailValidatorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
})
export class AuthModule {}
