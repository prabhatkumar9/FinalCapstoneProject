import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // cartlist
  private cartList: Product[] = new Array<Product>();

  // behave subject
  private cart$ = new BehaviorSubject<Product[]>(this.cartList);

  constructor() {}

  sendMsg(cartItem) {
    this.cartList.push(cartItem);
  }

  getCart() {
    return this.cart$;
  }

  removeFromCart(productid: number) {
    this.cartList.forEach((item, index) => {
      if (item.productid === productid) {
        this.cartList.splice(index, 1);
      }
    });
  }
}
