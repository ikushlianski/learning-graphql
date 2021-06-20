const path = require("path");
const fs = require("fs");
const { ApolloServer } = require("apollo-server");

const links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => null,
    feed: () => links,
    link: (parent, { id }) => links.find((link) => link.id === id),
  },
  Mutation: {
    createPost: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },
    updateLink: (parent, { id, url, description }) => {
      const linkToUpdate = links.find((link) => link.id === id);

      if (linkToUpdate) {
        linkToUpdate.url = url ?? linkToUpdate.url;
        linkToUpdate.description = description ?? linkToUpdate.description;
      }

      return linkToUpdate;
    },
    removeLink: (parent, { id }) => {
      const byLinkId = (link) => link.id === id;
      const linkToDelete = links.find(byLinkId);
      const linkToDeleteIndex = links.findIndex(byLinkId);

      if (linkToDelete) {
        links.splice(linkToDeleteIndex, 1);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
