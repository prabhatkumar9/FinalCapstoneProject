import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnDestroy, OnInit {
  // product list // fetch from database
  productList: Array<Product>;

  // observable and its variable to store data
  products$: Observable<Product[]>;
  products = new Array<Product>();

  // install datatables api//
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  // dt element
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  // constructor
  constructor(
    private httpService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private chRef: ChangeDetectorRef
  ) {}

  render() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // destroy existing table or old table
      dtInstance.destroy();
      // rerender the new table
      this.dtTrigger.next();
    });
  }

  ngOnInit(): void {
    // this.refreshProductList(this.action);

    // data tables function
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      autoWidth: true,
      order: [[0, 'desc']],
    };

    // subscribe service
    this.products$ = this.httpService.getProducts();
    this.products$.subscribe((result) => {
      this.products = result;

      // call changedetected ref object
      this.chRef.detectChanges();

      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  // update existing product
  updateProduct(id) {
    console.log(id);
    this.router.navigate(['update-product', id]);
  }

  // delete product
  deleteProduct(id) {
    console.log(id);
    this.httpService.deleteProduct(id).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => console.log(error)
    );
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  // refresh product list when event is emit from child component
  refreshProductList(value): void {
    console.log('add button clicked and list refreshed');
    // function
    this.httpService
      .getProducts()
      .subscribe((response) => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {
    this.productList = response;
  }

  // display Add product component on button click
  showAddComponent: boolean = false;
  addProduct() {
    this.showAddComponent = !this.showAddComponent;
  }
  //
}
