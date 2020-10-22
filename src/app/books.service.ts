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

  // protected djangoHost = 'http://127.0.0.1:8000';
  protected djangoHost = 'https://api-books-backend.herokuapp.com';

  public localhost = 'http://localhost:4200/';
  public token = localStorage.getItem('userToken');
  protected httpHeaders = new HttpHeaders(
    {Authorization: `Token ${this.token}`}
  );
  public isLogIn: boolean = this.isExistToken();

  allBooks(): Observable <any> {
    return this.http.get(`${this.djangoHost}/Books/`, {headers: this.httpHeaders});
  }

  onlyOneBook(id: number): Observable <any> {
    return this.http.get(`${this.djangoHost}/Books/${id}/`, {headers: this.httpHeaders});
  }

  addBook(newBook: string): Observable <any> {
    return this.http.post(`${this.djangoHost}/Books/`, newBook, {headers: this.httpHeaders});
  }

  deleteItem(id: number): Observable <any> {
    return this.http.delete(`${this.djangoHost}/Books/${id}/`, {headers: this.httpHeaders});
  }

  editBook(editBook: string, id: number): Observable <any> {
    return this.http.put(`${this.djangoHost}/Books/${id}/`, editBook, {headers: this.httpHeaders});
  }

  // login component
  loginService(userData: string): Observable <any> {
    return this.http.post('http://127.0.0.1:8000/auth/', userData);
  }

  isExistToken(): boolean {
    if (localStorage.getItem('userToken') === null ){
      return false;
    } else {
      return true;
    }
  }

}
