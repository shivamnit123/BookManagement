package com.intellect.Book.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.intellect.Book.entity.BookInfo;
import com.intellect.Book.repository.BookRepository;


@Service
public class BooksImplementation implements BooksService{

	
	@Autowired
	private BookRepository bookrepo;

	@Override
	public List<BookInfo> display() {
		List<BookInfo>ls = bookrepo.findAll();
		return ls;

	}


	@Override
	public String update(BookInfo updatedBook, String bookId) {
	    return bookrepo.findById(bookId)
	        .map(existingBook -> {
	            if (updatedBook.getBook_Name() != null) 
	                existingBook.setBook_Name(updatedBook.getBook_Name());

	            if (updatedBook.getAuthor_Name() != null) 
	                existingBook.setAuthor_Name(updatedBook.getAuthor_Name());

	            if (updatedBook.getPrice() != null) 
	                existingBook.setPrice(updatedBook.getPrice());

	            if (updatedBook.getPublishedYear() != null) 
	                existingBook.setPublishedYear(updatedBook.getPublishedYear());

	            if (updatedBook.getGenre() != null) 
	                existingBook.setGenre(updatedBook.getGenre());

	            bookrepo.save(existingBook); 
	            return "Book updated successfully";
	        })
	        .orElse("No such book exists");
	}

	@Override
	public BookInfo search(String s) {
	
		
		if(bookrepo.existsById(s))
		{
			Optional<BookInfo> op = bookrepo.findById(s);
			return op.get();
		}
		return null;
	}

	@Override
	public String delete(String s) {
		if(bookrepo.existsById(s))
		{
			bookrepo.deleteById(s);
		}else{
	       return "No such data exist";
		}
		return "Data Deleted Successfully";
	}


	@Override
	public Map<String, String> insert(BookInfo e) {
		bookrepo.save(e);
	    Map<String, String> response = new HashMap<>();
	    response.put("message", "Book added successfully!");
	    return response;
	}

}
