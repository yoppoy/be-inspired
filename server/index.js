const express = require('express');
const graphqlConfig = require('./graphql/index.js');
const cors = require('cors');
let app = express();

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
app.use('/graphql', graphqlConfig);
app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));