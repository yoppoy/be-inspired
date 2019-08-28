import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Grid from '@material-ui/core/Grid';
import ArticleCard from "../components/ArticleCard";

export default function Board() {
    const {loading, error, data} = useQuery(gql`
        {
            articles {
                title
                author
                description
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
            {data.articles.map(({title, author, description}) => (
                <ArticleCard key={title} title={title} author={author} description={description}/>
            ))}
        </Grid>

    );
}