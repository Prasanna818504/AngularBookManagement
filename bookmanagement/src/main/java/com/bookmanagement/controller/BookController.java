package com.bookmanagement.controller;

import com.bookmanagement.model.Book;
import com.bookmanagement.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/sorted")
    public List<Book> getBooksSortedByTitle() {
        return bookRepository.findAllSortedByTitle();
    }

    @GetMapping("/search")
    public List<Book> searchBooks(@RequestParam String keyword) {
        return bookRepository.searchBooks(keyword);
    }

    @GetMapping("/filter")
    public List<Book> filterBooksByPrice(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return bookRepository.filterBooksByPrice(minPrice, maxPrice);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}