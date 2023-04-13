import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  cartItemsNum: number = 0

  constructor(private _authService: AuthService, private _Router: Router, private _CartService: CartService) {
    _CartService.numberOfCartItems.subscribe({
      next: (x) => {

        this.cartItemsNum = x

      }
    })
  }


  isLogin: boolean = false

  ngOnInit(): void {
    this._authService.currentUser.subscribe({
      next: () => {
        if (this._authService.currentUser.getValue() != null)
          this.isLogin = true
        else
          this.isLogin = false
      }
    })
  }

  logOut() {
    localStorage.removeItem('userToken')
    localStorage.removeItem('cartId')
    this._authService.currentUser.next(null)

    this._Router.navigate(['/login'])
  }

}
