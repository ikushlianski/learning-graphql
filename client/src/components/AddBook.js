import React, { useState } from 'react';
import { useQuery } from '@apollo/client'
import { getAuthorsQuery } from '../queries/queries.js'

const AddBook = () => {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState('')
  const [authorId, setAuthorId] = useState('')

  const { error, data, loading } = useQuery(getAuthorsQuery)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const submit = (e) => {
    e.preventDefault();

    console.log('name', name)
    console.log('genre', genre)
    console.log('authorId', authorId)

  }

  return (
    <form id="add-book" onSubmit={submit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setGenre(e.target.value)} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={(e) => setAuthorId(e.target.value)}>
          {data.authors.map(author => (
            <option key={author.id} value={author.id}>{author.name}</option>

          ))}
        </select>
      </div>

      <button>Add book</button>
    </form>
  );
};

export default AddBook;
