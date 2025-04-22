package com.intellect.Book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.intellect.Book.entity.BookInfo;

@Repository
public interface BookRepository extends JpaRepository<BookInfo,String>{
   
}
