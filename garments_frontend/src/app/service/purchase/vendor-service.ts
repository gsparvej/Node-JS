import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Vendor } from '../../model/vendor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  private baseurl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.baseurl + "/api/vendor/", vendor);
  }

  getAllVendor(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.baseurl + "/api/vendor/");
  }
  getVendorById(id: number): Observable<any> {
    return this.http.get(this.baseurl + "/api/vendor/" + id);
  }
}
