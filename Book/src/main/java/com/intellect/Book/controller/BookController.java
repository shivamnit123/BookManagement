package com.intellect.Book.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.intellect.Book.entity.BookInfo;
import com.intellect.Book.service.BooksService;


@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api/book")
public class BookController {

	@Autowired
	private BooksService bookservice;
	
	@GetMapping("/get-all-books")
	public List<BookInfo> getAllbooks()
	{
		List<BookInfo>book_list = bookservice.display();
		return book_list;
	}
	
	@PostMapping("/add-book")
	public ResponseEntity<Map<String, String>> insert(@RequestBody BookInfo b) {
	    Map<String, String> response = bookservice.insert(b);
	    return ResponseEntity.ok(response);
	}
	
	@PutMapping("/update-books/{id}")
	
	public String update(@RequestBody BookInfo b , @PathVariable("id") String s)
	{
		return bookservice.update(b, s);
	}
	
	@DeleteMapping("/delete-book/{id}")
	public String  delete(@PathVariable("id") String s)
	{
		return bookservice.delete(s);
	}
	
    @GetMapping("/search-book/{id}")
    public BookInfo search(@PathVariable("id")String s)
    {
    	return bookservice.search(s);
    }
}
