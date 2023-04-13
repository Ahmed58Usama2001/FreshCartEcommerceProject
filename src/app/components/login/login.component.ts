import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService: AuthService, private _Router: Router, private _CartService: CartService) { }

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    }
  )

  errorMsg: string = ``

  submitLogin(formData: FormGroup) {


    this._AuthService.login(formData.value).subscribe({
      next: (data) => {
        if (data.message === 'success') {


          localStorage.setItem('userToken', data.token)

          this._AuthService.saveCurrentUser()

          this._Router.navigate(['/cart'])


        }
      },
      error: (err) => {
        if (err.error.errors.msg === 'Invalid email')
          this.errorMsg = err.error.errors.msg


      }

    })


  }

}

