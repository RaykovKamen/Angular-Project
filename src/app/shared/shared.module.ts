import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserService } from '../core/service/user.service';
import { storageServiceProvider } from '../core/service/storage.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [WelcomeComponent],
  providers: [UserService, storageServiceProvider],
})
export class SharedModule {}
