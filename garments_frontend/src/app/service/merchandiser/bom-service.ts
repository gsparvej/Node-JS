import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bom } from '../../model/bom.model';

@Injectable({
  providedIn: 'root'
})
export class BomService {

  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


   saveBOM(bom: Bom): Observable<Bom> {
      return this.http.post<Bom>(this.baseUrl + "/api/bom/", bom);
    }
  
   
  
    viewBOMByStyleCode(styleCode: string): Observable<any> {
      return this.http.get(this.baseUrl + '/api/bom/styleCode/' + styleCode);
    }
  



}
