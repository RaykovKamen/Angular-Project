import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/service/cart.service';
import {
  MessageBusService,
  MessageType,
} from 'src/app/core/service/message-bus.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  public products: any = [];

  constructor(
    private cartService: CartService,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  emptyCart() {
    this.cartService.removeAllCart();

    this.messageBus.notifyForMessage({
      text: 'You successfuly bought the product/s!',
      type: MessageType.Success,
    });
  }
}
