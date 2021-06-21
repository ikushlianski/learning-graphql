const path = require("path");
const fs = require("fs");
const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => null,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: (parent, { id }, context) => {
      return context.prisma.link.findUnique({ where: { id: Number(id) } });
    },
  },
  Mutation: {
    createPost: (parent, args, context, info) => {
      return context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
    },
    // todo were implemented with an in-memory array, same principle applies with Prisma
    // updateLink: (parent, { id, url, description }) => {
    //   const linkToUpdate = links.find((link) => link.id === id);
    //
    //   if (linkToUpdate) {
    //     linkToUpdate.url = url ?? linkToUpdate.url;
    //     linkToUpdate.description = description ?? linkToUpdate.description;
    //   }
    //
    //   return linkToUpdate;
    // },
    // removeLink: (parent, { id }) => {
    //   const byLinkId = (link) => link.id === id;
    //   const linkToDelete = links.find(byLinkId);
    //   const linkToDeleteIndex = links.findIndex(byLinkId);
    //
    //   if (linkToDelete) {
    //     links.splice(linkToDeleteIndex, 1);
    //   }
    // },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
