import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { CartService } from '../../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems = new Array<Product>();

  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getCartList();
  }

  removeItem(productid: number) {
    this.cartService.removeFromCart(productid);
  }

  getCartList() {
    this.cartService.getCart().subscribe((result) => {
      // console.log(result);
      this.cartItems = result;
      this.cartItems.forEach((element) => {
        this.totalPrice += element.price;
      });
    });
  }

  gotoShipping() {
    this.router.navigate(['shipping']);
  }
}
