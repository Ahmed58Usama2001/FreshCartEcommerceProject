import { Component } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLoading: boolean = false
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 20,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 12
      }
    },
    nav: true
  }

  constructor(private _ProductsService: ProductsService) {

  }

  allCategories: any[] = []
  allSubCategories: any[] = []

  category() {

    this._ProductsService.categories().subscribe({
      next: (data) => {
        this.allCategories = data.data

      }

    })
  }

  emptyCatMSG: string = ''

  getSubCat(id: any) {
    this.isLoading = true
    this._ProductsService.subCategories(id).subscribe({
      next: (data) => {
        if (data.results != 0) {

          this.emptyCatMSG = ''
        }
        else {
          this.allSubCategories = []
          this.emptyCatMSG = 'No subcategories available in this Category'
        }

        this.allSubCategories = data.data
        this.isLoading = false
      }
    })
  }

  ngOnInit(): void {
    this.category()

  }

  products: any[] = []
  emptyMSG: string = ''

  getProducts(id: any) {

    this._ProductsService.products(id).subscribe({
      next: (data) => {
        if (data.results != 0) {
          this.products = data.data.sort((a: any, b: any) => b.ratingsAverage - a.ratingsAverage)
          this.emptyMSG = ''
        }
        else {
          this.products = []
          this.emptyMSG = 'No products available in this subcategory'
        }

      }
    })
  }

}
