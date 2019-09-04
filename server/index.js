const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config/index');
const graphqlConfig = require('./graphql/index');
const {initArticles} = require('./graphql/resolvers');
const debug = require('debug')('be-inspired:index');
let app = express();

const startExpress = async () => {
    app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *
    app.use('/graphql', graphqlConfig);
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname+'/../client/build/index.html'));
    });
    app.listen(config.port, () => console.log('Server running on localhost:', config.port));

};

const startDB = async () => {
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
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
            console.log("server started succesfully");
        }).catch((e) => {
            console.log(e);
        });
    }).catch((e) => {
        console.log(e);
    });
}).catch((e) => {
    console.log(e);
});
