import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useApolloClient} from "react-apollo-hooks";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import {useQuery} from "react-apollo-hooks";
import {GQL_EDITOR_MODE} from "../graphql/localState";

export default function HeaderBar() {
    const classes = useStyles();
    const classesLabel = useStylesCustomLabel();
    const client = useApolloClient();
    const {data} = useQuery(GQL_EDITOR_MODE);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Be inspired
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                            control={<Switch checked={data.editorMode}
                                             color="default"
                                             onChange={(event) => client.writeData({data: {editorMode: event.target.checked}})}
                                             aria-label="Editor mode"/>}
                            label={'Editor mode'}
                            classes={classesLabel}
                        />
                    </FormGroup>
                </Toolbar>
            </AppBar>
        </div>
    );
}

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