import { Component } from '@angular/core';
import { BooksService } from './books.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private bs: BooksService
  ){}
  title = 'books';
  isLogin: boolean = this.bs.isLogIn;

  logout = () => {
    localStorage.removeItem('userToken');
    localStorage.clear();
    window.location.href = this.bs.localhost;
  }

}
