/*
* Configures the redux router
* */
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import HomePage from '../containers/HomePage';

const Routes = (
    <Switch>
        <Route path="/editor-mode" component={HomePage}/>
        <Route path="/" component={HomePage}/>
    </Switch>
);

export default Routes;
