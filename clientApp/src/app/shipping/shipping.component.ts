import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { PaymentService } from 'src/services/payment.service';
import { Product } from 'src/model/product';
import { DatePipe } from '@angular/common';
import { PaymentModel } from 'src/model/paymentModel';
import { Order } from 'src/model/order';
import { Customer } from 'src/model/customer';
import { Register } from 'src/model/register';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnInit {
  // cart items
  private cartItems = new Array<Product>();

  // date var
  private orderDate = new Date();

  // modeof payment
  private paymentMode = 'PayTM';

  // tables data object
  private payment = new PaymentModel();
  order = new Order();
  user: Register = new Register();
  private customer = new Customer();
  private orderList = new Array<Order>();

  // varaible to store paymentid;
  private payId: number;
  // order id
  private orderid: number;

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((result) => (this.cartItems = result));
  }

  // cart total amount to pay
  getTotalAmount() {
    let totalAmount = 0;
    this.cartItems.forEach((element) => {
      totalAmount += element.price;
    });
    return totalAmount;
  }

  placeOrder() {
    this.feedModelClasses();
    // console.log(this.customer);
    this.finalUpdateCustomer();
  }

  feedModelClasses() {
    // payment object
    this.payment.paymentmode = this.paymentMode;
    this.payment.amount = this.getTotalAmount();

    //  order object
    this.order.orderDate = this.datePipe.transform(
      this.orderDate,
      'yyyy-MM-dd'
    );
    this.order.payment = this.payment;
    this.order.products = this.cartItems;

    // call service
    this.serviceCall();
    // get and set id from post api call
    this.payment.id = this.payId;
    this.order.id = this.orderid;

    // push order in array
    this.orderList.push(this.order);

    // customer object
    this.user.id = Number(localStorage.getItem('userid'));
    this.user.email = localStorage.getItem('useremail');
    this.customer.user = this.user;
    this.customer.orders = this.orderList;
  }

  serviceCall() {
    this.paymentService.savePayment(this.payment).subscribe((result) => {
      this.payId = result.id;
      console.log(result);
    });

    this.paymentService.saveOrder(this.order).subscribe((result) => {
      this.orderid = result.id;
      console.log(result);
    });
  }

  finalUpdateCustomer() {
    this.paymentService
      .updateCustomerOrderDetails(this.customer)
      .subscribe((result) => {
        console.log(result);
      });
  }
}
// pay krne pe order details yha se jaegi
// service class k pass or api post hoga
// nahi h possible sab tables me individually hi dalna pdega
// phle payment post hoga
// 2nd order post hoga
// 3rd customer post
