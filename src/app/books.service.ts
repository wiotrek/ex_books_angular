import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(
    protected http: HttpClient
  ) { }

  allBooks(): Observable <any> {
    return this.http.get('http://127.0.0.1:8000/Books/');
  }

  addBook(newBook: string): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/Books/', newBook);
  }
}
