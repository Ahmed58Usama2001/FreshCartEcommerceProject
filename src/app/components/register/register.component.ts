import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^(02)?(01)[0-25][0-9]{8}$/)])
    }, { validators: this.repasswortMatch });


  repasswortMatch(registerForm: any) {


    let passwordControl = registerForm.get('password')
    let repasswordControl = registerForm.get('rePassword')

    if (passwordControl?.value === repasswordControl?.value) {

      return null;
    }
    else {
      repasswordControl?.setErrors({ passwordmatch: "Password and repassword doesn't match" })

      return { passwordmatch: "Password and rePAssword doesn't match" }
    }
  }

  errorMsg: string = ``

  submitRegister(formData: FormGroup) {


    this._AuthService.register(formData.value).subscribe({
      next: (data) => {
        if (data.message === 'success') {
          this._Router.navigate(['/login'])
        }
      },
      error: (err) => {
        if (err.error.message === 'Account Already Exists')
          this.errorMsg = err.error.message


      }

    })


  }

}

