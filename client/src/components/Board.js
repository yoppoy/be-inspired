import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import ArticleCard from "./ArticleCard";
import {makeStyles} from "@material-ui/core";
import Loading from "./Loading";
import {Element} from 'react-scroll';
import {GQL_QUERY_ARTICLES} from "../graphql";

export default function Board({editorMode = false}) {
    const classes = useStyles();
    const {loading, error, data} = useQuery(GQL_QUERY_ARTICLES);
    let delay = 0;

    if (loading) return <Loading/>;
    if (error) return <p>Error :(</p>;
    return (
        <Element name={"board"}>
            <Grid id={"board"}
                  className={classes.grid}
                  container
                  direction="row"
                  justify="center">
                {data.articles.map((article, index) => {
                    delay += 30;
                    return (
                        <div key={article.title} className={classes.cardContainer}>
                            <ArticleCard article={article} editorMode={editorMode} delay={delay}/>
                        </div>
                    );
                })}
            </Grid>
        </Element>
    );
}

const useStyles = makeStyles(theme => ({
    grid: {
        padding: 20,
        marginTop: 10
    },
    cardContainer: {
        padding: 10,
    },
}));
