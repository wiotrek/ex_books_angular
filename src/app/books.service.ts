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

  onlyOneBook(id: number): Observable <any> {
    return this.http.get(`${this.djangoHost}/Books/${id}/`);
  }

  addBook(newBook: string): Observable <any> {
    return this.http.post(`${this.djangoHost}/Books/`, newBook);
  }

  deleteItem(id: number): Observable <any> {
    return this.http.delete(`${this.djangoHost}/Books/${id}/`);
  }

  editBook(editBook: string, id: number): Observable <any> {
    return this.http.put(`${this.djangoHost}/Books/${id}/`, editBook);
  }
}
