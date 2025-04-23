import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../updateComponent/update.css";

const UpdateBooks = () => {
  const [searchId, setSearchId] = useState("");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

 
  const fetchBook = async () => {
    if (!searchId) {
      alert("Please enter a Book ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8081/api/book/search-book/${searchId}`);
      if (!response.ok) throw new Error("Book not found");

      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      setBook(null);
      setError(error.message);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "price" || name === "publishedYear") && (value < 0 || isNaN(value))) return;
    setBook({ ...book, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!book) return;

    try {
      const response = await fetch(`http://localhost:8081/api/book/update-books/${searchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book.");
    }
  };

  return (
    <div className="container">
      <h2>Update Book</h2>

      {/* Search Section */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter Book ID"
          value={searchId}
          onChange={handleSearchChange}
        />
        <button onClick={fetchBook}>🔍 Search</button>
      </div>

      {loading && <p className="loading">📚 Loading book details...</p>}
      {error && <p className="error">❌ {error}</p>}

      {/* Update Form */}
      {book && (
        <form className="update-form" onSubmit={handleUpdate}>
          <label>Book Name</label>
          <input type="text" name="book_Name" placeholder="Book Name" value={book.book_Name} onChange={handleChange} />
          <label>Author Name</label>
          <input type="text" name="author_Name" placeholder="Author Name" value={book.author_Name} onChange={handleChange} />
          <label>Price</label>
          <input type="text" name="price" placeholder="Price" value={book.price} onChange={handleChange} />
          <label>Published Year</label>
          <input type="text" name="publishedYear" placeholder="Published Year" value={book.publishedYear} onChange={handleChange} />
          <label>Genre</label>
          <input type="text" name="genre" placeholder="Genre" value={book.genre} onChange={handleChange} />
          <button type="submit">✅ Update Book</button>
        </form>
      )}
    </div>
  );
};

export default UpdateBooks;
