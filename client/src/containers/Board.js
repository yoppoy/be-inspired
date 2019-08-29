import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import ArticleCard from "../components/ArticleCard";
import {makeStyles} from "@material-ui/core";
import Loading from "../components/Loading";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        padding: 10,
    },
}));

export default function Board() {
    const classes = useStyles();
    const {loading, error, data} = useQuery(gql`
        {
            articles {
                title
                author
                description
                url
                image
                type
            }
        }
    `);

    if (loading) return <Loading/>
    if (error) return <p>Error :(</p>;

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {data.articles.map(({title, url, description, author, image, type}) => (
                <div key={title} className={classes.cardContainer}>
                    <ArticleCard title={title} author={author} description={description} url={url} image={image}
                                 type={type}/>
                </div>
            ))}
        </Grid>

    );
}