import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserService } from '../core/service/user.service';
import { storageServiceProvider } from '../core/service/storage.service';
import { AppRoutingModule } from '../app-routing.module';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [WelcomeComponent, TransactionComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [WelcomeComponent],
  providers: [UserService, storageServiceProvider],
})
export class SharedModule {}
