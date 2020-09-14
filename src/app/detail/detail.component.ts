import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BooksService } from '../books.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('id', id);

    this.bs.onlyOneBook(id).subscribe(
      response => {
        console.table('log ' + response);
        this.showBook = response;
      },
      error => {
        console.log(error);
      }
    );



    this.editBook = new FormGroup({
      title: new FormControl(''),
      description: new FormControl('')
    });

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
