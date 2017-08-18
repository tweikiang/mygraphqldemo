const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ56');
const resolvers = (models) => ({
  Query: {
    getUserById(root, { id }) {
      return models.User.findById(id).then((response) => response);
    },

    getUserByEmail(root, { email }) {
      return models.User.findOne({ email }).then((response) => response);
    },

    getConfessionById(root, { id }) {
      return models.Confession.findById(id).then((response) => response);
    },
  },
  Mutation: {
    createUser(root, args) {
      const user = new models.User(args);
      return user.save().then((response) => response);
    },
    createConfession(root, args) {
      const confession = new models.Confession(args);
      confession.uid = shortid.generate();
      return confession.save().then((response) => response);
    },
  },
});

module.exports = resolvers;
