import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  ngOnInit(): void {
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
