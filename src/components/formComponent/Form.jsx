import React, { useState } from "react";
import "../formComponent/form.css";
import { useNavigate } from "react-router-dom";
const Form = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        book_Id: "",
        book_Name: "",
        author_Name: "",
        price: "",
        publishedYear: "",
        genre: ""
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        if ((name === "price" || name === "publishedYear") && (value < 0 || isNaN(value))) return;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting data:", formData);
      
        try {
          const response = await fetch("http://localhost:8081/api/book/add-book", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to submit data: ${errorText}`);
          }
      
          const result = await response.json();
          console.log("Success:", result);
          alert(result.message); 
          setFormData({
            book_Id: "",
            book_Name: "",
            author_Name: "",
            price: "",
            publishedYear: "",
            genre: ""
          });
        } catch (error) {
          console.error("Error:", error);
          alert("Error submitting data.");
        }
      };      
      
    
      return (
        <div className="container">
          <div className="form-container">
            <h2>📚 Book Management System</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="book_Id" placeholder="Book ID" value={formData.book_Id} onChange={handleChange} />
              <input type="text" name="book_Name" placeholder="Book Name" value={formData.book_Name} onChange={handleChange} />
              <input type="text" name="author_Name" placeholder="Author Name" value={formData.author_Name} onChange={handleChange} />
              <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
<input type="text" name="publishedYear" placeholder="Published Year" value={formData.publishedYear} onChange={handleChange} />
              <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} />
              <button type="submit">SUBMIT</button>
            </form>
            <button onClick={() => navigate("/books")}>FETCH ALL BOOKS</button>
            <button onClick={() => navigate("/edit-book")}>UPDATE BOOK</button>
          </div>
          
        </div>
        
      );
};

export default Form;