import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import VisibleIcon from '@material-ui/icons/Visibility';
import InvisibleIcon from '@material-ui/icons/VisibilityOffOutlined';
import {Grow, Fade} from '@material-ui/core';
import {useMutation} from "@apollo/react-hooks";
import {GQL_MUTATION_ARTICLES} from "../graphql";

export default function ArticleCard({article, editorMode = false, delay = 0}) {
    const classes = useStyles();
    const [appear, setAppear] = useState(false);
    const [visible, setArticleVisible] = useState(article.visible);
    const [setArticleVisibility] = useMutation(GQL_MUTATION_ARTICLES);

    setTimeout(() => setAppear(true), delay);
    return (
        <Grow in={appear}>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {article.type.substring(0, 1)}
                        </Avatar>
                    }
                    title={article.author}
                    subheader={article.type}
                    action={<Fade in={editorMode}>
                        <IconButton aria-label="set-visibility" onClick={() => {
                            setArticleVisibility({variables: {id: article.id, visible: !visible}});
                            setArticleVisible(visible);
                        }}>
                            {visible ? <VisibleIcon/> : <InvisibleIcon/>}
                        </IconButton>
                    </Fade>
                    }
                    className={classes.header}
                />
                <CardActionArea className={`${classes.content} ${!visible && classes.disabled}`} href={article.url}
                                target={'_blank'}>
                    <CardMedia
                        className={classes.media}
                        image={article.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {article.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {article.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grow>
    );
}

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        height: 380,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        width: 313
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
    },
    disabled: {
        opacity: 0.2
    }
});