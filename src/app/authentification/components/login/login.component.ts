import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  loginInvalid = false;

  constructor(
    private router: Router,
    private loginservice: AuthentificationService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  checkLogin() {
    console.log(this.username.value);
    this.loginservice
      .authenticate(this.username.value, this.password.value)
      .subscribe(
        (data) => {
          if (data.role == 'User') {
            this.router.navigate(['/products']);
          } else {
            this.router.navigate(['/categories']);
          }
          this.loginInvalid = false;
        },
        (error) => {
          this.loginInvalid = true;
        }
      );
  }
}
