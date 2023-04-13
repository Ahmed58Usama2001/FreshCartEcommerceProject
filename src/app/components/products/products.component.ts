import { Component } from '@angular/core';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(private _ProductsService: ProductsService) { }

  products: any[] = []


  ngOnInit(): void {
    this.showProducts()
  }

  showProducts() {
    this._ProductsService.allProducts().subscribe({
      next: (data) => { this.products = data.data.sort((a: any, b: any) => b.ratingsAverage - a.ratingsAverage) }

    })
  }


}
