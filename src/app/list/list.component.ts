import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(
    private bs: BooksService,
  ) { }

  public showBooks: [];
  public postBook: any;
  public isShowedForm = false;
  public pageNext: string;
  public p = 1;
  public isLogIn = this.bs.isLogIn;
  // genreBooks: Map <number, string>;
  genreBooks;

  ngOnInit(): void {
    this.getBooks();
    console.log(this.genreBooks);
    this.postBook = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
      genre: new FormControl('', [Validators.required])
    });
  }

  getBooks = () => {
    this.bs.allBooks().subscribe(
      response => {
        this.showBooks = response;

        this.genreBooks = new Map(response[0].GENRE);
        // this.genreBooks = response[0].GENRE;
        console.log(this.genreBooks);
      }
    );
  }

  createPost = () => {
    this.bs.addBook(this.postBook.value).subscribe(
      response => {
        this.isShowedForm = false;
        this.getBooks();
      },
      error => {
        console.log(error);
      }
    );
  }

}

