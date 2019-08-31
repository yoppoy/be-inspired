import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Board from "../components/Board";
import {withRouter} from "react-router-dom";
import {Parallax} from 'react-scroll-parallax';
import HomeBanner from "./FullScreen";

function HomePage({location}) {
    const classes = useStyles();
    let editorMode = false;

    if (location.path === "editor-mode")
        editorMode = false;
    return (
        <div>
            <HomeBanner img={"/img/background.jpg"}
                        title={"Learn from your mistakes and move on"}
                        link={"board"}/>
            <Board className={classes.board} editorMode={editorMode}/>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    board: {
        paddingTop: '20px'
    }
}));

export default withRouter(HomePage);