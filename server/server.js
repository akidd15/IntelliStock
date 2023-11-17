const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const app = express();
const PORT = process.env.PORT || 3001;
// variable for apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Apollo server
const startApolloServer = async () => {
  await server.start();
  // moved from outside function
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  if (process.env.NODE_ENV === 'production') {
    // changed to '../client/dist' changed from '../client/build'
    app.use(express.static(path.join(__dirname, '../client/dist')));
    // added for Apollo
    app.get('*',(req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    })
  }

  // added for Apollo
  app.use('/graphql', expressMiddleware(server));
  // needed to make app run from routes
  // app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();