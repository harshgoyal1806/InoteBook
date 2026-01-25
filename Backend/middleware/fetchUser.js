const jwt = require("jsonwebtoken");
const redisClient = require("../config/redisClient");
const MY_SECRET = process.env.JWT_SECRET;
const fetchUser = async (req,res,next)=>{
    //get the user from the jwt token and id to req object   
   try {
    const token = req.cookies.token;
    if(!token){
      return   res.status(401).send({error :"Authentication failed."});
    }
    const isBlocked = await redisClient.exists(`token:${token}`);
    if(isBlocked){
      return   res.status(401).send({error :"Authentication failed. Please login in to continue."});
    }
    const data  =jwt.verify(token,MY_SECRET);
    req.user = data.user
    next();
   } catch (error) {
    res.status(401).send({error :"Authentication failed. Please sign in to continue."});
   }
}
module.exports = fetchUser