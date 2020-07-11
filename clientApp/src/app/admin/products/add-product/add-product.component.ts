import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/model/product';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  // product object to store value from view

  product = new Product();
  constructor(
    private httpclientservice: ProductService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  // display component on button click from parent component
  AddProductButton: boolean = false;
  @Input('AddProductButton')
  set setValue(value: boolean) {
    this.AddProductButton = value;
  }
  //

  // event emitter to refresh product list after new product added
  @Output()
  productAddedEvent: EventEmitter<Product> = new EventEmitter();

  addNewProduct(value): void {
    console.log(this.product);
    console.log(value);
    this.httpclientservice.addProduct(this.product).subscribe((product) => {
      this.productAddedEvent.emit(null);
    });
  }
  //
}
