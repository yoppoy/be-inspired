import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 345
    },
    media: {
        height: 100
    },
    content: {
    },
    link: {
        color: 'inherit',
        textDecoration: 'none'
    }
});

export default function ArticleCard({title, description, url, image, author, type}) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <a className={classes.link} href={url} target={'_blank'}>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {type.substring(0,1)}
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
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </a>
        </Card>
    );
}