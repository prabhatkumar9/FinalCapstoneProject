import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PaymentModel } from 'src/model/paymentModel';
import { Order } from 'src/model/order';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // variable
  // customer obejct Behaviour Subject
  private fullOrderDetail: Customer;
  private fullOrder$ = new BehaviorSubject<Customer>(this.fullOrderDetail);

  constructor(private httpClient: HttpClient) {}

  public savePayment(payment: PaymentModel): Observable<any> {
    return this.httpClient.post<PaymentModel>(
      'http://localhost:8080/pay/savePay',
      payment
    );
  }

  public saveOrder(order: Order): Observable<any> {
    return this.httpClient.post<Order>(
      'http://localhost:8080/pay/saveOrder',
      order
    );
  }

  public updateCustomerOrderDetails(cutomer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>(
      'http://localhost:8080/pay/updateCustomer',
      cutomer
    );
  }

  setDetail() {}

  getDetail() {}
}
