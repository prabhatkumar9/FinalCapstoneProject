import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/model/product';
import { ProductService } from 'src/services/product.service';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // observable and its variable to store data
  // products$: Observable<Product[]>;
  products: Product[] = [];

  // // for cartList
  cartItems: Product[] = [];
  // productItem: Product;

  // message
  msg: string;

  constructor(
    private httpService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.httpService.getProducts().subscribe((result) => {
      this.products = result;
      // console.log(this.products);
    });
  }

  // add to cart handler
  addToCart(item: Product) {
    console.log(item);
    this.cartService.sendMsg(item);
    // this.cartItems.push(item);
    // this.msg = 'added';
  }
}
