import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) { }

  baseURL: string = 'https://route-ecommerce-app.vercel.app/'


  allbrands(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}api/v1/brands`)
  }



}
