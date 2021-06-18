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

  return <div id="book-details">Book Details:</div>;
};

export default BookDetails;
