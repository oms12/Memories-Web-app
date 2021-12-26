import React, { useEffect, useState } from "react";
import {Container,AppBar,Typography, Grow, Grid} from "@material-ui/core";
import icon from "./Images/icon.png";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles";
import axios from "axios";
const url = "http://localhost:3000/posts/";
function App()
{
   const classes = useStyles();
   const [posts,setposts] = useState([]);
   const [get,setget] = useState(false);
   const [need,setneed] = useState(false);
   const [createpost,setcreatepost] = useState({
    creator : "",
    title : "",
    message : "",
    tags : "",
    selectedFile : ""
  });
   useEffect(() => {
      async function getdata()
      {
         try {
            const res = await axios.get(url);
            setposts(res.data);
         } catch (error) {
             console.log(error);
         }
      }
      getdata();
   },[get]);
   async function addpost(post)
   {
      try {
          const t = await posts.filter((temppost) =>
          {
              return post._id === temppost._id;
          })[0];
          if(t)
          {
              //console.log(post._id);
              setneed(false);
              var res1 = await axios.post(url + "update/" + post._id, post);
              console.log(res1.data);
              setget(!get);
              
          }

          else{
            setneed(false);
            const res = await axios.post(url + "add" , post);
            console.log(res.data);
            //console.log(post);
            setget(!get);
          }
      } catch (error) {
          console.log(error);
      }
   }
   async function Delete(id)
   {
      try {
          
          const res = await axios.delete(url + id);
          console.log(res.data);
          setget(!get);
      } catch (error) {
          console.log(error);
      }
   }
async   function Update(id)
   {
       try {
           //console.log(id);
           setneed(true);
           const t = await posts.filter((post)=>
            {
                return post._id === id;
            })[0];

            //console.log(t);
            setcreatepost(t);
            setget(!get);   
       } catch (error) {
           console.log(error);
       }
   }
   function fun()
   {
       setneed(false);
   }



   return (
       <Container maxWidth = "lg">
        <AppBar className = {classes.appBar} position = "static" color = "inherit">
            <Typography className = {classes.heading} variant="h4" align="center"> Memories</Typography>
            <img className = {classes.image} src = {icon} alt="memories" height={100} width={100}></img>
        </AppBar>
        <Grow in>
          <Container>
              <Grid container justifyContent =  "space-between" alignItems="stretch"  spacing = {3}>
                <Grid item xs = {12} sm = {7}>
                    <Posts Posts = {posts} onDelete = {Delete} onUpdate = {Update} />
                </Grid>
                <Grid item xs = {12} sm = {4}>
                    <Form onAdd = {addpost} createpost = {createpost} need = {need} fun = {fun} />
                </Grid>
              </Grid>
          </Container>
        </Grow>
       </Container>
   )
}
export default App;