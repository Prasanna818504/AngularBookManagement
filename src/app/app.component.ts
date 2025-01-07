import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  newBook: Book = { title: '', author: '', isbn: '', price: null }; // Initialize price to null
  searchKeyword: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }

  loadBooksSorted(): void {
    this.bookService.getBooksSortedByTitle().subscribe((data) => (this.books = data));
  }

  searchBooks(): void {
    if (this.searchKeyword.trim()) {
      this.bookService.searchBooks(this.searchKeyword).subscribe((data) => (this.books = data));
    } else {
      this.loadBooks();
    }
  }

  filterBooks(): void {
    this.bookService.filterBooksByPrice(this.minPrice, this.maxPrice).subscribe((data) => (this.books = data));
  }

  addBook(): void {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.loadBooks();
      this.newBook = { title: '', author: '', isbn: '', price: null };
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }
}