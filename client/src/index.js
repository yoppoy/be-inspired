import React from 'react';
import {render} from 'react-dom';
import {ApolloProvider} from "react-apollo";
import {ApolloProvider as ApolloHooksProvider} from "react-apollo-hooks";
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import './index.css';
import HeaderBar from "./components/HeaderBar";
import HomePage from "./containers/HomePage";

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
});

client.writeData({
    data: {
        editorMode: false
    },
});

const App = () => (
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <HeaderBar/>
            <HomePage/>
        </ApolloHooksProvider>
    </ApolloProvider>
);

render(<App/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
