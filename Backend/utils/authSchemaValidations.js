const Joi = require("joi")
const loginValidation = (req,res,next)=>{
    const loginSchema = Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().min(6).required()
    });
    const {error} = loginSchema.validate(req.body,{abortEarly:false});
    if (error) {
    return res.status(400).json({
      message: error.message,
      errors: error.details.map((detail) => detail.message), // Clean error messages
    });
  }
  next();
}
const signupValidation = (req,res,next)=>{
    const signupSchema = Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(6).required()
    });

    const {error} = signupSchema.validate(req.body,{abortEarly:false});
    if (error) {
    return res.status(400).json({
      message: error.message,
      errors: error.details.map((detail) => detail.message), // Clean error messages
    });
  }
  next();
}
module.exports = {loginValidation,signupValidation};