import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import useStyles from "./style";
const Post = (props) => {
  const classes = useStyles();
  const post = props.post;
  let txt = "";
  (post.tags).forEach(element => {
      txt += ("#" + element + " ");
  });
  function handleClickdelete()
  {
      props.onDelete(post._id);
  }
  function handleClickupdate()
  {
    props.onUpdate(post._id);
  }





  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image= {post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={handleClickupdate}><MoreHorizIcon fontSize="medium" /></Button>
      </div>
      <div className={classes.details}>
      <Typography variant="body2" color="textSecondary" component="h2">{txt}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={handleClickdelete} ><DeleteIcon fontSize="small" /> Delete</Button>
      </CardActions>
    </Card>
  );
};

export default Post;