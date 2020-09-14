import { Component, OnInit } from '@angular/core';
import { BooksService } from './books.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'books';
  constructor(
    private bs: BooksService,
  ){ }
  public showBooks: [];
  public postBook: any;

  ngOnInit(): any {
    this.getBooks();

    this.postBook = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });
  }

  createPost = () => {
    this.bs.addBook(this.postBook.value).subscribe(
      response => {
        console.log(response);
        this.getBooks();
      },
      error => {
        console.log(error);
      }
    );
  }

  getBooks = () => {
    this.bs.allBooks().subscribe(
      response => {
        this.showBooks = response;
      },
      error => {
        console.log(error);
      }
    );
  }

}
