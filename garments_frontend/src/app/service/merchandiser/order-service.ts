import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + "/api/order/", order);
  }

  getAllOrderList(): Observable<any> {
    return this.http.get(this.baseUrl + "/api/order/");
  }

  viewOrderDetails(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/api/order/' + id);
  }



}
