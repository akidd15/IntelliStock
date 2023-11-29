const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const db = require('./config/connection');
// const { authMiddleware } = require('./utils/auth');
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
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, '../client/dist')));
    
    app.get('*',(req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    })
  }

  
  app.use('/graphql', expressMiddleware(server, 
    // { context: authMiddleware }
    ));
  

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();