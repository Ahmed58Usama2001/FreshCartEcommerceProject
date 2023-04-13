import jwt from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberOfCartItems = new BehaviorSubject(0)

  constructor(private _HttpClient: HttpClient, private _AuthService: AuthService) {
    this.getLoggedUserCart().subscribe({
      next: (data) => {
        this.numberOfCartItems.next(data.numOfCartItems)
      },
      error: (err) => {
        console.log(err);

      }
    })
  }





  baseURL: string = 'https://route-ecommerce-app.vercel.app/'
  token: any = this._AuthService.token



  addToCart(productId: any): Observable<any> {


    let dataobj = { productId }
    let newToken: any = localStorage.getItem('userToken')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': newToken
    });
    const requestOptions = { headers: headers };

    return this._HttpClient.post(`${this.baseURL}api/v1/cart`, dataobj, requestOptions);
  }


  getLoggedUserCart(): Observable<any> {

    let newToken: any = localStorage.getItem('userToken')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': newToken
    });

    const requestOptions = { headers: headers };
    return this._HttpClient.get(`${this.baseURL}api/v1/cart`, requestOptions);
  }


  updateCart(count: number, id: any): Observable<any> {


    let dataobj = { count }
    let newToken: any = localStorage.getItem('userToken')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': newToken
    });
    const requestOptions = { headers: headers };

    return this._HttpClient.put(`${this.baseURL}api/v1/cart/${id}`, dataobj, requestOptions);
  }

  removeItem(id: any): Observable<any> {

    let newToken: any = localStorage.getItem('userToken')

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': newToken
    });

    const requestOptions = { headers: headers };

    return this._HttpClient.delete(`${this.baseURL}api/v1/cart/${id}`, requestOptions);
  }
}
