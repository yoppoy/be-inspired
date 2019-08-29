import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import {useQuery} from "react-apollo-hooks";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Board from "./Board";
import {gql} from "apollo-boost";
import {GQL_EDITOR_MODE} from "../graphql/localState";

export default function HomePage() {
    const { data } = useQuery(GQL_EDITOR_MODE);

    return (
        <div>
            <Board editorMode={data.editorMode}/>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    cardContainer: {
        padding: 10,
    },
}));
