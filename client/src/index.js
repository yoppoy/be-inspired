import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from "react-apollo";
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks";
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import './style/index.css';
import RouterConfig from "./config/RouterConfig";

const Uri = process.env.REACT_API_PORT ? `http://localhost:${process.env.REACT_API_PORT}/graphql` : 'http://localhost/graphql';
console.log(`Connecting to : ${Uri}`);
const client = new ApolloClient({
    uri: Uri,
});

const App = () => (
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <RouterConfig/>
        </ApolloHooksProvider>
    </ApolloProvider>
);

render(<App/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
