import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private bs: BooksService,
  ) { }

  loggingFormGroup: any;
  passIsWrong: string;

  ngOnInit(): void {

    this.loggingFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)])
    });

  }

  logging = () => {
    this.bs.loginService(this.loggingFormGroup.value).subscribe(
      response => {
        console.log(response.token);
        localStorage.setItem('userToken', response.token);
        window.location.href = this.bs.localhost;
      },
      error => {
        this.passIsWrong = 'Wrong login or password';
      }
    );
  }

}
