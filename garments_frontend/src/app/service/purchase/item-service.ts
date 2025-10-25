import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseurl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.baseurl + "/api/items/", item);
  }

  getAllItem(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseurl + "/api/items/");
  }

}
