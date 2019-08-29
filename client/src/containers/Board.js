import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import ArticleCard from "../components/ArticleCard";
import {makeStyles} from "@material-ui/core";
import Loading from "../components/Loading";
import {GQL_QUERY_ARTICLES} from "../graphql";

export default function Board({editorMode = false}) {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GQL_QUERY_ARTICLES);
    let delay = 0;

    console.log(editorMode);
    if (loading) return <Loading/>;
    if (error) return <p>Error :(</p>;
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {data.articles.map((article, index) => {
                delay += 30;
                return (
                    <div key={article.title} className={classes.cardContainer}>
                        <ArticleCard article={article} editorMode={editorMode} delay={delay}/>
                    </div>
                );
            })}
        </Grid>

    );
}

const useStyles = makeStyles(theme => ({
    cardContainer: {
        padding: 10,
    },
}));
