import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Uom } from '../../model/uom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UomService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveUOM(uom: Uom): Observable<Uom> {
    return this.http.post<Uom>(this.baseUrl + "/api/uom/", uom);
  }

  getAllUOM(): Observable<any> {
    return this.http.get(this.baseUrl + "/api/uom/");
  }
}
