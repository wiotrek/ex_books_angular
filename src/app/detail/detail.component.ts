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
    public editBook: any;
    public isShowedForm = false;
    public areYouDeletePost = false;
    public isVisibleCard = true;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bs.onlyOneBook(id).subscribe(
      response => {
        this.showBook = response;
        this.editBook = new FormGroup({
          title: new FormControl(`${this.showBook.title}`, [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
          description: new FormControl(`${this.showBook.description}`,
          [Validators.required, Validators.minLength(3), Validators.maxLength(256)])
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteItem(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bs.deleteItem(id).subscribe(
      response => {
        console.log('delete');
        this.location.back();
      },
      error => {
        console.log('nie delete');
      }
    );
  }

  editPost = () => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bs.editBook(this.editBook.value, id).subscribe(
      response => {
        console.log(response);
        this.location.back();
      },
      error => {
        console.log(error);
      }
    );
  }

  back(): void {
    this.location.back();
  }

}
