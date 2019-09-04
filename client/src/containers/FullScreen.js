import React from 'react';
import {makeStyles} from "@material-ui/core";
import {Button, Typography} from '@material-ui/core';
import { scroller } from 'react-scroll';
import {ArrowDownward} from '@material-ui/icons';

const scrollTo = (element, duration = 800, delay = 0) => {
    console.log("scrolling to ", element);
    scroller.scrollTo(element, {
        duration: duration,
        delay: delay,
        smooth: 'easeInOutQuart'
    });
};

export default function HomeBanner({img, title, link}) {
    const classes = useStyles();

    return (
        <div className={classes.background} style={{backgroundImage: 'url(' + img + ')'}}>
            <div className={classes.overlay}>
                <Typography className={classes.title} variant="h2">
                    {title}
                </Typography>
                <div className={classes.sticky}>
                    <Button variant="outlined" color={"primary"} onClick={() => scrollTo(link)}>
                        <ArrowDownward/>
                    </Button>
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    background: {
        height: '100vh',
        backgroundColor: 'black',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    overlay: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        backgroundAttachment: 'fixed',
        position: 'relative'
    },
    sticky: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    scrollDown: {
        color: 'white',
    },
    title: {
        color: 'white',
        textAlign: "center",
        maxWidth: '800px',
        margin: 20
    }
}));