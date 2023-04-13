import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _HttpClient: HttpClient) { }

  BaseURL: string = 'https://route-ecommerce-app.vercel.app/'
  token: any = localStorage.getItem('userToken')


  checkoutOnline(cartID: any, details: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': this.token
    });

    const requestOptions = { headers: headers };
    let objectData = {
      "shippingAddress": {
        details
      }
    }

    return this._HttpClient.post(`${this.BaseURL}api/v1/orders/checkout-session/${cartID}?url=http://localhost:4200`, objectData, requestOptions)
  }




}
