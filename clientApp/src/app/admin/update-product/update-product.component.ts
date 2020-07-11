import { Component, OnInit } from '@angular/core';
import { Product } from 'src/model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  id: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.product = new Product();

    this.id = this.route.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.product = data;
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.update();
  }

  update() {
    this.productService.updateProduct(this.product).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.product = new Product();
    this.gotoAdminpannel();
  }

  gotoAdminpannel() {
    this.router.navigate(['/admin']);
  }
}
