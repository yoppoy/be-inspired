/*
* Configures the redux router
* */
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import CustomTheme from "../style/theme";
import HeaderBar from "../components/HeaderBar";
import {ThemeProvider} from "@material-ui/styles";
import {ParallaxProvider} from 'react-scroll-parallax';

const RouterConfig = () => (
    <BrowserRouter>
        <ThemeProvider theme={CustomTheme}>
            <ParallaxProvider>
                {<HeaderBar/>}
                <div className="content">
                    {Routes}
                </div>
            </ParallaxProvider>
        </ThemeProvider>
    </BrowserRouter>
);

export default RouterConfig;
