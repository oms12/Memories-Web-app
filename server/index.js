import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser  from "body-parser";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors({origin : "*",}));
/// app set up

app.get("/", (req,res)=>
{
  res.send("Welcome to App");
});



app.use(bodyParser.json({limit :"50mb",extended : true}));
app.use(bodyParser.urlencoded({limit :"50mb",extended : true}));

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB connection established successfully");
});

app.use("/posts",postRoutes);
app.use("/users",userRoutes);


app.listen(process.env.PORT || 3000,()=>{
  console.log("server started");
 });
 


