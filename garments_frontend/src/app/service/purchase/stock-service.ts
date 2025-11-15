import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StockInModel } from '../../model/stockIn.model';
import { Observable } from 'rxjs';
import { StockOutModel } from '../../model/stockOut.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseurl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAllStockIn(): Observable<StockInModel[]> {
    return this.http.get<StockInModel[]>(this.baseurl + "/api/inventory/viewStockIn");
  }

  getAllStockOut(): Observable<StockOutModel[]> {
    return this.http.get<StockOutModel[]>(this.baseurl + "/api/inventory/viewStockOut");
  }

}
