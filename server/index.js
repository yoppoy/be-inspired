const express = require('express');
const graphqlConfig = require('./graphql/index.js');
let app = express();

app.use('/graphql', graphqlConfig);
app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));