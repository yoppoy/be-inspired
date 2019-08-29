import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
    },
    progress: {
        margin: theme.spacing(2),
    }
}));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <CircularProgress className={classes.progress}/>
        </div>
    );
}