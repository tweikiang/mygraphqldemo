const schema = `
  type User {
    id: ID!
    email: String!
    password: String
  }
  type Confession {
    id: ID!
    socialid: String!
    socialnetwork: String!
    message: String
    uid: String
  }
  type Query {
    getUserById(id: ID!): User
    getUserByEmail(email: String!): User
    getConfessionById(id: ID!): Confession
  }
  type Mutation {
    createUser(email: String! password: String!): User
    createConfession(socialid: String! socialnetwork: String! message: String): Confession
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = schema;
