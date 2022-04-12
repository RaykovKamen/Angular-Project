import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/core/service/cart.service';
import { IUser } from '../interfaces';
import { AuthService } from '../service/auth.service';
import { MessageBusService, MessageType } from '../service/message-bus.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public totalItem: number = 0;
  public searchTerm!: string;

  currentUser$: Observable<IUser> = this.authService.currentUser$;
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  message: string;
  isMessageError: boolean;

  private isLoggingOut: boolean = false;

  private subscription: Subscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
    this.subscription = this.messageBus.onNewMessage$.subscribe(
      (newMessage) => {
        this.message = newMessage?.text || '';
        this.isMessageError = newMessage?.type === MessageType.Error;
        if (this.message) {
          setTimeout(() => {
            this.messageBus.clear();
          }, 3000);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logoutHandler(): void {
    if (this.isLoggingOut) {
      return;
    }

    this.isLoggingOut = true;

    this.authService.logout$().subscribe({
      next: (args) => {
        console.log(args);
      },
      complete: () => {
        this.isLoggingOut = false;
        this.router.navigate(['/home']);
      },
      error: () => {
        this.isLoggingOut = false;
      },
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}
