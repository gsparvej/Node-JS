import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { BomStyle } from '../../model/bomStyle.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BomStyleService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveBomStyle(bomStyle: BomStyle): Observable<BomStyle> {
    return this.http.post<BomStyle>(this.baseUrl + "/api/bomStyle/", bomStyle);
  }

  getBomstyleList(): Observable<any> {
    return this.http.get(this.baseUrl + "/api/bomStyle/");
  }


}
