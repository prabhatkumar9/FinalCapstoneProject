import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { shareReplay, flatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // observable product
  private productList$: Observable<Product[]>;

  constructor(private httpClient: HttpClient) {}

  // get all products
  getProducts(): Observable<Product[]> {
    // if productlist is not in cache mmry
    // decrease api call load
    if (!this.productList$) {
      this.productList$ = this.httpClient
        .get<Product[]>('http://localhost:8080/product/get')
        .pipe(shareReplay());
    }
    // cache exist
    return this.productList$;
  }

  // add new products
  addProduct(newProduct: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      'http://localhost:8080/product/add',
      newProduct
    );
  }

  // get product by id
  // get from cache not from api call
  getProductById(id: number): Observable<Product> {
    return this.getProducts().pipe(
      flatMap((result) => result),
      first((product: Product) => product.productid == id)
    );
  }

  // update product
  updateProduct(product: Product): Observable<any> {
    return this.httpClient.put<Product>(
      'http://localhost:8080/product/update',
      product
    );
  }

  //  delete product
  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      'http://localhost:8080/product/delete/' + id
    );
  }

  // clear cache
  clearCache() {
    this.productList$ = null;
  }
}
