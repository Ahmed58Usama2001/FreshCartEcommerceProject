import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { CheckoutService } from 'src/app/checkout.service';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService: CartService, private _ProductsService: ProductsService, private _CheckoutService: CheckoutService) { }



  shippingForm: FormGroup = new FormGroup(
    {
      details: new FormControl(''),
      phone: new FormControl(''),
      city: new FormControl(''),

    }
  )



  submitForm(data: FormGroup) {
    let cartId = localStorage.getItem('cartId')
    this._CheckoutService.checkoutOnline(cartId, data.value.toString()).subscribe({
      next: (data: any) => {
        console.log(data)
        if (data.status === 'success') {
          location.href = data.session.url
          localStorage.removeItem('cartId')
        }
      },
      error: (err) => {
        console.log(err);
      }

    })

  }



  cartDetail: any = {}
  products: [] = []

  ngOnInit(): void {
    let newToken: any = localStorage.getItem('userToken')

    this._CartService.getLoggedUserCart().subscribe({
      next: (data) => {
        if (data.status == 'success') {
          this.cartDetail = data

          localStorage.setItem('cartId', data.data._id)

        }
      },
      error: (err) => {
        console.log(err);

      }
    })
  }



  quantityMsg: string = ''

  updataCountFun(e: any, id: any) {

    let finalEdit = () => {
      this._CartService.updateCart(e.target.value, id).subscribe({

        next: (data) => {
          if (data.status == 'success')
            this.cartDetail = data
          this.products = data.data.products
          this.quantityMsg = ''
        },
        error: (err) => console.log(err)


      })
    }

    this._ProductsService.singleProduct(id).subscribe({
      next: (data) => {
        if (data.data.quantity > Number(e.target.value))
          finalEdit()
        else
          this.quantityMsg = 'only ' + data.data.quantity + ' left'
      }
    })
  }

  removeItemFun(id: any) {
    this._CartService.removeItem(id).subscribe({
      next: (data) => {
        if (data.status == 'success') {

          this._CartService.numberOfCartItems.next(data.numOfCartItems)
          this.cartDetail = data
          this.products = data.data.products
        }
      },
      error: (err) => console.log(err)
    })
  }

}
