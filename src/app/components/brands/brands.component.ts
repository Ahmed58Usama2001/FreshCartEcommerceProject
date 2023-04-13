import { BrandsService } from './../../brands.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  constructor(private _BrandsService: BrandsService) { }

  brands: any[] = []

  ngOnInit(): void {
    this.showBrands()
  }



  showBrands() {
    this._BrandsService.allbrands().subscribe({
      next: (data) => { this.brands = data.data }

    })
  }



}
