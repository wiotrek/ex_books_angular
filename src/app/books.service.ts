import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(
    protected http: HttpClient
  ) { }

  protected djangoHost = 'http://127.0.0.1:8000';

  allBooks(): Observable <any> {
    return this.http.get(`${this.djangoHost}/Books/`);
  }

  addBook(newBook: string): Observable <any> {
    return this.http.post(`${this.djangoHost}/Books/`, newBook);
  }
}
