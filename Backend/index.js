const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectToMongo = require("./db");
const redisClient = require("./config/redisClient");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter")
const notesRouter = require("./routes/notesRouter")
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend origin
  credentials: true
}));
app.get("/inotes",(req,res)=>{
    res.send("hii i am Harsh");
});

app.use("/api/auth",authRouter);
app.use("/api/notes",notesRouter);
app.use((req, res) => {
  res.status(404).send("Route not found: " + req.originalUrl);
});

const port = process.env.PORT || 5000;
const initializeConnection = async()=>{
    try {
       await Promise.all([redisClient.connect(),connectToMongo()]); 
       console.log("Connected to db and redis");
       app.listen(port,()=>{
            console.log("Listening to port 5000");
        })

    } catch (error) {
        console.log("Error : ",error.message);
    }
}
initializeConnection();

