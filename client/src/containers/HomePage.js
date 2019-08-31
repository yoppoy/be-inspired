import React, {useState} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import Board from "../components/Board";
import {withRouter} from "react-router-dom";
import HomeBanner from "./FullScreen";
import {Element} from "react-scroll/modules";

function HomePage({location}) {
    const classes = useStyles();
    let editorMode = false;

    if (location.pathname === "/editor-mode")
        editorMode = true;
    console.log(location);
    return (
        <div>
            <HomeBanner img={"/img/background.jpg"}
                        title={"Learn from your mistakes and move on"}
                        link={"board"}/>
            <Element name={"board"}>
                <div className={classes.titleContainer}>
                    <Typography className={classes.title} variant="h2">
                        Get inspired...
                    </Typography>
                </div>
                <Board className={classes.board} editorMode={editorMode}/>
            </Element>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    board: {
        paddingTop: '20px'
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "50px"
    }
}));

export default withRouter(HomePage);