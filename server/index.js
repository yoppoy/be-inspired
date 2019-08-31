const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/index');
const graphqlConfig = require('./graphql/index');
const {initArticles} = require('./graphql/resolvers');
const debug = require('debug')('be-inspired:index');
let app = express();

const startExpress = async () => {
    app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
    app.use('/graphql', graphqlConfig);
    app.listen(config.port, () => console.log('Server running on localhost:4000/graphql'));
};

const startDB = async () => {
    await mongoose.connect(config.mongo.host, {
        useNewUrlParser: true,
        user: config.mongo.user,
        pass: config.mongo.password,
        authSource: 'admin'
    });
};

startDB().then(() => {
    startExpress().then(() => {
        initArticles().then(() => {
            console.log("done");
        }).catch((e) => {
            console.log(e);
        });
    }).catch((e) => {
        console.log(e);
    });
}).catch((e) => {
    console.log(e);
});
