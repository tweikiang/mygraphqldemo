const resolvers = (models) => ({
  Query: {
    getUserById(root, { id }) {
      return models.User.findById(id).then((response) => response);
    },

    getUserByEmail(root, { email }) {
      return models.User.findOne({ email: email }).then((response) => response);
    },

    getConfessionById(root, { id }) {
      return models.Confession.findById(id).then((response) => response);
    },

    getConfessionByUid(root, { uid }) {
      return models.Confession.findOne({'uid':uid}).then((response) => response);
    },
  },
  Mutation: {
    createUser(root, args) {
      const user = new models.User(args);
      return user.save().then((response) => response);
    },
    createConfession(root, args) {
      const confession = new models.Confession(args);
      return models.Sequence.findOne({'purpose':'confession'}).then((data) => {
        console.log(data);
        if(!data){
          data = new models.Sequence();
          data.count = 1;
          data.purpose = 'confession';
        }
        confession.uid = ""+data.count;
        data.count++;
        console.log('data 2 =====')
        console.log(data)
        return data.save().then((c)=>{
          return confession.save().then((response) => response);
        });
      });
    },
  },
});

module.exports = resolvers;
