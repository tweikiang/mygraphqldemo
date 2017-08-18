const hapi = require('hapi');
const mongoose = require('mongoose');
const { apolloHapi, graphiqlHapi } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const User = require('./models/user');
const Confession = require('./models/confession');

const graphqlSchema = require('./graphql/schema');
const createResolvers = require('./graphql/resolvers');

const server = new hapi.Server();
const Config = require('./config');
server.connection({
  host: Config.host,
  port: Config.port,
});

mongoose.connect('mongodb://'+Config.db.host+':'+Config.db.port+'/'+Config.db.app);

const executableSchema = makeExecutableSchema({
  typeDefs: [graphqlSchema],
  resolvers: createResolvers({ User, Confession }),
});

server.register({
  register: apolloHapi,
  options: {
    path: '/graphql',
    apolloOptions: () => ({
      pretty: true,
      schema: executableSchema,
    }),
  },
});

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
