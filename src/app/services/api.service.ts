import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlMarket: string;
  urlPaises: string;

  constructor(private http: HttpClient) {
    this.urlMarket = environment.urlMarket;
    this.urlPaises = environment.urlPaises;
  }

  postGuardar(body: any): Observable<any> {
    return this.http.post(this.urlMarket, body);
  }

  getMetodo(pais: any): Observable<any> {
    return this.http.get(this.urlPaises + pais);
  }
}
