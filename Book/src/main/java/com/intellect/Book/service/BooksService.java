package com.intellect.Book.service;

import java.util.List;
import java.util.Map;

import com.intellect.Book.entity.BookInfo;

public interface BooksService {
    
	public List<BookInfo> display();
    Map<String, String> insert(BookInfo e);
	public String delete(String s);
	public String update(BookInfo e,String s);
	public BookInfo search(String s);
}

