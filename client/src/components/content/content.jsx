import React, { useEffect, useState } from "react";
import {Container, Grow, Grid} from "@material-ui/core";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import axios from "axios";
import Nav from "../Navbar/navbar";
const url = "https://gautam-memeories-app.herokuapp.com/posts/";
function Content()
{
   const [posts,setposts] = useState([]);
   const [get,setget] = useState(false);
   const [need,setneed] = useState(false);

   const [createpost,setcreatepost] = useState({
    title : "",
    message : "",
    tags : "",
    selectedFile : ""
  });
   useEffect(() => {
      async function getdata()
      {
         try {
            const options = {
                url: url,
                method : "get",
                headers :{
                    'authorization' : "Bearer " + localStorage.getItem("mytoken"),
                }
            }
           const res = await axios(options);
           console.log(res);
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
              const option1 = {
                url: url + "update/" + post._id,
                method: 'post',
                headers: {
                  'authorization' : "Bearer " + localStorage.getItem("mytoken"),
                },
                data : post
              };
              var res1 = await axios(option1);
              console.log(res1.data);
              setget(!get);
              
          }

          else{
            setneed(false);
            const option1 = {
                url: url + "add",
                method: 'post',
                headers: {
                  'authorization' : "Bearer " + localStorage.getItem("mytoken"),
                },
                data : post
              };
            const res = await axios(option1);
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
        const option1 = {
            url: url + id,
            method: 'delete',
            headers: {
              'authorization' : "Bearer " + localStorage.getItem("mytoken"),
            },
            data : id
          };
          
          const res = await axios(option1);
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
        
        <Grow in>
          <Container>
              <Nav />
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
export default Content;