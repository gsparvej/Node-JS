import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseModel } from '../../model/po.model';

@Injectable({
  providedIn: 'root'
})
export class PoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAllPO(): Observable<any>{
      
  return this.http.get(this.baseUrl+"/api/po/");
}
      
  savePO(po: PurchaseModel) : Observable<any> {
        
  return this.http.post(this.baseUrl+"/api/po/",po);
  }


   viewPODetails(id: number): Observable<any> {
    return this.http.get(this.baseUrl+'/api/po/'+id);
  }
  
}
