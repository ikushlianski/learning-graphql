import React from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries.js";
import BookDetails from "./BookDetails.js";

const BookList = () => {
  const [selectedBookId, setSelectedBookId] = React.useState(null);

  const { error, data, loading } = useQuery(getBooksQuery);

  const selectBook = (e, bookId) => {
    setSelectedBookId(bookId);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li key={book.id}>
            <a href="#" onClick={(e) => selectBook(e, book.id)}>
              Title: {book.name}
            </a>
          </li>
        ))}
      </ul>

      <hr />

      {selectedBookId && <BookDetails bookId={selectedBookId} />}
    </div>
  );
};

export default BookList;
