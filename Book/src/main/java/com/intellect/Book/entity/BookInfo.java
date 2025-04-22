package com.intellect.Book.entity;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class BookInfo {
   @Id
   private String book_Id;
   private String book_Name;
   private String author_Name;
   private String price;
   private String publishedYear;
   private String genre;
}
