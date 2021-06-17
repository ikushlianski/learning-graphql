import React from 'react';
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries.js'

const BookList = () => {
  const { error, data, loading } = useQuery(getBooksQuery)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map(book => (
          <li key={book.id}>
            <p>Title: {book.name}</p>
            <small>id: {book.id}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
