import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InventoryModel } from '../../model/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseurl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  getAllInventory(): Observable<InventoryModel[]> {
    return this.http.get<InventoryModel[]>(this.baseurl + "/api/inventory/inventories");
  }

 addStock(stock: any): Observable<any> {
  return this.http.post<any>(this.baseurl + "/api/inventory/addStock", stock);
}
 removeStock(stock: any): Observable<any> {
  return this.http.post<any>(this.baseurl + "/api/inventory/removeStock", stock);
}




}
