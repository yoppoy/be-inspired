import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom'
import {useApolloClient} from "react-apollo-hooks";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import {useQuery} from "react-apollo-hooks";

const HeaderBar = ({location, history}) => {
    const classes = useStyles();
    const classesLabel = useStylesCustomLabel();
    const client = useApolloClient();

    if (location.pathname === "/editor-mode")
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>

                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch checked={true}
                                                 color="default"
                                                 onChange={() => history.push('/')}
                                                 aria-label="Editor mode"/>}
                                label={'Editor mode'}
                                classes={classesLabel}
                            />
                        </FormGroup>
                    </Toolbar>
                </AppBar>
            </div>
        );
    return null;
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: "white"
    }
}));

const useStylesCustomLabel = makeStyles(theme => ({
    label: {
        color: 'white',
        fontWeight: 'bold'
    }
}));

export default withRouter(HeaderBar);