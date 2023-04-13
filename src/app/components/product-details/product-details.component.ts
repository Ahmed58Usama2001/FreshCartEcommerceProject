import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  constructor(private _ProductsService: ProductsService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService) { }

  productID: any;
  myData: any = {}
  title: string = ''
  images: string[] = []

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.productID = params['id'];
      this._ProductsService.singleProduct(this.productID).subscribe({
        next: (data) => {
          this.myData = data.data;
          this.title = data.data.title;
          this.images = data.data.images;

        }
      });
    });
  }

  msg: string = ''

  addToCartFunc(id: any) {

    this._CartService.addToCart(id).subscribe({
      next: (data) => {
        if (data.status == 'success' && localStorage.key(0) == 'userToken' || localStorage.key(1) == 'userToken') {
          this.msg = data.message
          this._CartService.numberOfCartItems.next(data.numOfCartItems)
        }



      },
      error: (err) => this.msg = ''

    })
  }

}
