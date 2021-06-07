import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import {schema} from "./schema/schema.js";
import mongoose from 'mongoose'

const app = express();

mongoose.connect('mongodb+srv://test1:wg9nP2ud0jhNhZKy@cluster0.4o3qg.mongodb.net/graphqldb',  {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('CONNECTED!')

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));

  app.listen(4000, () => {
    console.log('Listening for requests on port 4000')
  })
}).catch((e) => {
  console.error(e)
})
