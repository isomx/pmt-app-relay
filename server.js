'use strict';
process.env.NODE_ENV = 'development';
process.env.BABEL_ENV = 'development';
/** REFERENCE:
 *  https://github.com/apollographql/relay-modern-hello-world/blob/master/scripts/start.js
 */

import path from 'path';
import express from 'express';
import { privateSettings } from './server/config/settings';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import schema from './server/data/schema';
import cors from 'cors';

//const PORT = process.env.PORT || 3002;
const PORT = 3002;
const app = express();
const corsOptions = {
  origin: 'http://localhost:3315',
  credentials: true
};


/**
 * ADDITIONAL MIDDLEWARE OPTION  - it works, but unnecessary since we're using cors(). But could be used for other reasons
 * DOCS: https://github.com/apollographql/graphql-server
 (req, res, next) => {
    console.log('in middleware');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3315');
    next();
  }
 */

const helperMiddleware = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  cors(corsOptions),
];
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}))
app.use('/graphql', ...helperMiddleware, graphqlExpress({
  schema: schema
}));
//app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Fuck yea, app is now running on http://localhost:${PORT}`);
});

// app.use(require('prerender-node').set('prerenderToken', privateSettings.prerenderToken ));
// app.use(express.static(''))

