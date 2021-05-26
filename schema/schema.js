import graphql, { GraphQLSchema } from 'graphql';
import {mockData} from "../mock-data.js";

const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return mockData.find(person => person.id === args.id)
      }
    }
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery
})
