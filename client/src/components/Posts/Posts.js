import React from "react";
import Post from "./Post/Post.js";
import { Grid } from '@material-ui/core';
import useStyles from "./style";

const Posts = (props)=>
{
    const posts = props.Posts;
    //console.log(Posts);
    const classes = useStyles();
    return(
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
         {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post
              post={post} 
              key = {post._id}
              id = {post._id}
              onDelete = {props.onDelete}
              onUpdate = {props.onUpdate}
              />
          </Grid>
        ))}
      </Grid>
    );
}
export default Posts;