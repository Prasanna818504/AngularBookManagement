import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBooksSortedByTitle(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/sorted`);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  filterBooksByPrice(minPrice: number, maxPrice: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
