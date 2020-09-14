import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BooksService } from '../books.service';

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

  back(): void {
    this.location.back();
  }
}
