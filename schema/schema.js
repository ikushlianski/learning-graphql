import graphql, { GraphQLID, GraphQLSchema } from 'graphql';
import { authorModel } from "../models/author.js";
import { bookModel } from "../models/book.js";

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {

      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        let author = new authorModel({
          name: args.name,
          age: args.age
        });

        return author.save()
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        let book = new bookModel({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        })

        return book.save()
      }
    }
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
