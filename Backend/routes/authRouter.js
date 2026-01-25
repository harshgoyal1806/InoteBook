const express = require("express");
const authRouter = express.Router();
const {login,signup,logout,getUser} = require("../controllers/authControllers");
const {loginValidation,signupValidation}  =require("../utils/authSchemaValidations");
const fetchUser = require("../middleware/fetchUser");
authRouter.post("/login",loginValidation,login);
authRouter.post("/signup",signupValidation,signup);
authRouter.get("/logout",fetchUser,logout);
authRouter.get("/getUser",fetchUser,getUser);

module.exports = authRouter;
