import React, { useState, useEffect } from "react";
import "../FetchData/fetchbooks.css";

const FetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [searchedBook, setSearchedBook] = useState(null); // Store searched book

  // Fetch all books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8081/api/book/get-all-books");
      if (!response.ok) throw new Error("Failed to fetch books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Search for a book based on user input
  const handleSearch = async () => {
    if (!searchQuery) {
      alert("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8081/api/book/search-book/${searchQuery}`);
      if (!response.ok) throw new Error("Book not found");

      const data = await response.json();
      setSearchedBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      setSearchedBook(null);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h2>📖 Book List</h2>

      {/* Search Bar on Top */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Book ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>🔍 Search</button>
      </div>

      {loading && <p className="loading">📚 Loading...</p>}
      {error && <p className="error">❌ {alert("BOOK NOT EXIST")}</p>}

      {/* Display searched book if found */}
      {searchedBook && (
        <div className="searched-book">
          <h3>📘 Searched Book</h3>
          <table className="book-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Price</th>
                <th>Published Year</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{searchedBook.book_Id}</td>
                <td>{searchedBook.book_Name}</td>
                <td>{searchedBook.author_Name}</td>
                <td>₹{searchedBook.price}</td>
                <td>{searchedBook.publishedYear}</td>
                <td>{searchedBook.genre}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Display all books if no search */}
      {!searchedBook && books.length > 0 && (
        <table className="book-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Price</th>
              <th>Published Year</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_Id}>
                <td>{book.book_Id}</td>
                <td>{book.book_Name}</td>
                <td>{book.author_Name}</td>
                <td>₹{book.price}</td>
                <td>{book.publishedYear}</td>
                <td>{book.genre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FetchBooks;
