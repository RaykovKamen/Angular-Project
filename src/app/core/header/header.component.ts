import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/service/cart.service';
import { UserService } from 'src/app/core/service/user.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchTerm!: string;

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });
  }

  logoutHandler(): void {
    this.userService.logout();
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }
}
