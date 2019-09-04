import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import ArticleCard from "./ArticleCard";
import {makeStyles} from "@material-ui/core";
import Loading from "./Loading";
import {withRouter} from 'react-router-dom';
import {GQL_QUERY_ARTICLES, GQL_QUERY_ARTICLES_EDITOR} from "../graphql";

export default withRouter(function Board({editorMode = false, location}) {
    const classes = useStyles();
    let delay = 0;
    const {loading, error, data} = useQuery((location.pathname === "/editor-mode") ? GQL_QUERY_ARTICLES_EDITOR : GQL_QUERY_ARTICLES);

    if (loading) return <Loading/>;
    if (error) return <p>Error {JSON.stringify(error)}</p>;
    return (
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
    );
});

const useStyles = makeStyles(theme => ({
    grid: {
        padding: 20,
        marginTop: 10
    },
    cardContainer: {
        padding: 10,
    },
}));
