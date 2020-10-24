import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BooksService } from '../books.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private bs: BooksService
  ) { }

    public showBook: any;
    genreBooks;
    public editBook: any;
    public isShowedForm = false;
    public areYouDeletePost = false;
    public isVisibleCard = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bs.onlyOneBook(id).subscribe(
      response => {
        this.showBook = response;
        this.genreBooks = new Map(response.GENRE);
        this.editBook = new FormGroup({
          title: new FormControl(`${this.showBook.title}`, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
          description: new FormControl(`${this.showBook.description}`,
          [Validators.required, Validators.minLength(3), Validators.maxLength(256)]),
          year: new FormControl(`${this.showBook.year}`, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
          rating: new FormControl(`${this.showBook.rating}`, [Validators.required]),
          genre: new FormControl(`${this.showBook.genre[0]}` , [Validators.required]),
          amount_sites: new FormControl(`${this.showBook.amount_sites}`, [Validators.required]),
          author: new FormControl(`${this.showBook.author}`, [Validators.minLength(3), Validators.maxLength(255)])
        });
      },
      error => {}
    );
  }

  deleteItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bs.deleteItem(id).subscribe(
      response => {
        this.location.back();
      },
      error => {}
    );
  }

  editPost = () => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bs.editBook(this.editBook.value, id).subscribe(
      response => {
        this.location.back();
      },
      error => {}
    );
  }

  back(): void {
    this.location.back();
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

}
