import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) {
    if (localStorage.getItem('userToken') != null)
      this.saveCurrentUser();
  }

  currentUser: any = new BehaviorSubject(null)

  saveCurrentUser() {
    let encoded = JSON.stringify(localStorage.getItem('userToken'))
    let decoded = jwt(encoded)
    this.currentUser.next(decoded)
  }
  token: any = localStorage.getItem('userToken')

  baseURL: string = `https://route-ecommerce-app.vercel.app/`

  register(data: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}api/v1/auth/signup`, data)
  }

  login(data: object): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}api/v1/auth/signin`, data)
  }



  allProducts(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}api/v1/products`)
  }


}
