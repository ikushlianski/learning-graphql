import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries.js";

const BookDetails = ({ bookId }) => {
  const { error, data, loading } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });

  console.log("data", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div id="book-details">
      <h3>Book Details</h3>
      <div>Name: {data?.book?.name}</div>
      <div>Genre: {data?.book?.genre}</div>
      <div>By {data?.book?.author?.name}</div>

      <h5>More books from {data?.book?.author?.name}</h5>
      <ul>
        {data?.book?.author?.books.map((book) => {
          return <li>{book.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default BookDetails;
