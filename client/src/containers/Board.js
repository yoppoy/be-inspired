import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import ArticleCard from "../components/ArticleCard";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    cardContainer: {
        padding: 10,
    }
});

export default function Board() {
    const classes = useStyles();
    const {loading, error, data} = useQuery(gql`
        {
            articles {
                title
                author
                description
                url
            }
        }
    `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {data.articles.map(({title, url, description, author}) => (
                <div key={title} className={classes.cardContainer}>
                    <ArticleCard title={title} author={author} description={description} url={url}/>
                </div>
            ))}
        </Grid>

    );
}