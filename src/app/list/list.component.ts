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
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
      year: new FormControl(2000, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      rating: new FormControl([Validators.required]),
      genre: new FormControl([Validators.required]),
      amount_sites: new FormControl(100, [Validators.required]),
      author: new FormControl('', [Validators.minLength(3), Validators.maxLength(255)])
    });
  }

  getBooks = () => {
    this.bs.allBooks().subscribe(
      response => {
        this.showBooks = response;
        this.genreBooks = new Map(response[0].GENRE);
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

  numSequence(n: number): Array<number> {
    return Array(n);
  }
}

