import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class Orderservice {
  appUrl = "https://localhost:44384/";
  appOrder = "api/Orders"
  appOrderItem = "api/OrderItems/"
  private actualOrder = new BehaviorSubject<Order>({} as any);
  constructor(private http: HttpClient) { }
  
  addOrder(order: Order): Observable<Order>{
    return this.http.post<Order>
      (this.appUrl + this.appOrder, order);
  }
  actualizer(order: Order) {
    this.actualOrder.next(order);
  }

  getActualizer(): Observable<Order>
  {
    return this.actualOrder.asObservable();
  }

  removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
}
