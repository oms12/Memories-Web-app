import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "./style";
import FileBase64 from "react-file-base64";
const Form = (props)=>
{

    const classes = useStyles();
    const [post, setpost] = useState(props.createpost);
    useEffect(()=>
    {
      setpost(props.createpost);
    },[props.createpost]);
    

    function handleSubmit (event){
        props.onAdd(post);
        setpost({creator : "",
        title : "",
        message : "",
        tags : "", 
        selectedFile : ""});
    
        event.preventDefault();  
    };

    function clear() 
    {   
        props.fun();
        setpost({creator : "",
        title : "",
        message : "",
        tags : "", // be careful here I have changed a lot here
        selectedFile : ""});
    };
    function handleChange(event)
    {
      var {name,value} = event.target;
      setpost(prevValue=>
        {
          return ({
            ...prevValue,
            [name] : value,
          });
        })
    }

    return(
        <Paper className = {classes.paper}>
            <form autoComplete="off" noValidate  className = { `${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant = "h6">{props.need ? `Editing ${post.title}` :  "Creating a Memory"}</Typography>
                <TextField name="title"
                  variant = "outlined"
                  label = "title"
                  fullWidth
                  value = {post.title}
                  onChange = {handleChange}
                ></TextField>
                <TextField name="message"
                  variant = "outlined"
                  label = "message"
                  fullWidth
                  value = {post.message}
                  onChange = {handleChange}
                ></TextField>
                <TextField name="tags"
                  variant = "outlined"
                  label = "tags"
                  fullWidth
                  value = {post.tags}
                  onChange={(e) => setpost({ ...post, tags: e.target.value.split(',') })}
                ></TextField>
                <div className={classes.fileInput}><FileBase64 type="file" multiple={false} onDone={({ base64 }) => setpost({ ...post, selectedFile: base64 })} /></div>
                <Button className= {classes.buttonSubmit} variant = "contained" color = "primary" size = "large" type = "submit" onClick={handleSubmit} fullWidth >
                  Submit
                </Button>
                <Button  variant = "contained" color = "secondary" size = "small" onClick={clear} fullWidth >
                  Clear
                </Button>
             </form>
            
        </Paper>
    );
}
export default Form;