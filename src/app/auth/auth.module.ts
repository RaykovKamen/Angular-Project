import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ProfileComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class AuthModule {}
