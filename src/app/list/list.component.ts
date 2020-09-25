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

  ngOnInit(): void {
    console.log(this.bs.isLogIn);
    this.getBooks();
    this.postBook = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(256)])
    });
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

