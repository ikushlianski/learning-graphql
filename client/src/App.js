import React from "react";
import BookList from './components/BookList.js'
import AddBook from './components/AddBook.js'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>My reading list</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  )
}
