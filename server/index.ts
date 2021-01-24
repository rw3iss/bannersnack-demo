const express = require("express");
const cors = require('cors');
const fs = require('fs');
let path = require('path');
const { authenticateUser } = require('./lib/auth');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require('./api/resolvers');

const app = express();
const port = 8080;

app.use(cors());

// init graphql api
const schemaFile = path.join(__dirname, "api/schema.graphql");
const typeDefs = fs.readFileSync(schemaFile, "utf8");
const schema = makeExecutableSchema({ typeDefs });

app.use(authenticateUser);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    }),
);

// start server
app.listen(port, () => {
    console.log(`GraphQL API started at http://localhost:${port}`);
});