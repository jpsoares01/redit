import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { LoginUserResult as LoginUser } from '../service/login-user';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
})
export class LoginPageComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  userData : LoginUser = {
    email : "",
    password : ""
  }

  constructor(private service : UserService) { }

  login(){
    console.log(this.userData)
    this.service.login(this.userData)

    
      .subscribe(res => {
        console.log(res)
        console.log(res.jwt)
        sessionStorage.setItem("UsuarioLogadoId", res.jwt)
      })
    // this.service.login(this.userData)
    // .subscribe({
    //   next(value) {
    //     sessionStorage.setItem("UsuarioLogadoId", value.message)
    //   },
    //   error(err) {
    //     console.log(err)
    //   },
    //   complete() {
    //     console.log("Cabo")
    //   },
    // })
  }
}
