import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Grow} from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        height: 380
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: '100%',
        width: 345
    },
    media: {
        width: '100%',
        flex: '1 1 auto',
        height: '100%'
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
});

export default function ArticleCard({title, description, url, image, author, type}) {
    const classes = useStyles();

    return (
        <Grow in={true}>
            <Card className={classes.card}>
                <CardActionArea className={classes.content} href={url} target={'_blank'}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {type.substring(0, 1)}
                            </Avatar>
                        }
                        title={author}
                        subheader={type}
                    />
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}