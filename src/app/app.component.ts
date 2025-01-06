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
  newBook: Book = { title: '', author: '', isbn: '', price: 0 };
  searchKeyword: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => (this.books = data));
  }

  loadBooksSorted() {
    this.bookService.getBooksSortedByTitle().subscribe((data) => (this.books = data));
  }

  searchBooks() {
    if (this.searchKeyword.trim()) {
      this.bookService.searchBooks(this.searchKeyword).subscribe((data) => (this.books = data));
    } else {
      this.loadBooks();
    }
  }

  filterBooks() {
    this.bookService.filterBooksByPrice(this.minPrice, this.maxPrice).subscribe((data) => (this.books = data));
  }

  addBook() {
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.loadBooks();
      this.newBook = { title: '', author: '', isbn: '', price: 0 };
    });
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }
}