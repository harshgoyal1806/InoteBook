const Joi = require("joi");

const addNoteValidation = (req,res,next)=>{
    const schema = Joi.object({
        title:Joi.string().min(3).max(30).required(),
        description:Joi.string().min(3).max(50).required(),
        tag:Joi.string().min(3).max(30)
    });
    const {error} = schema.validate(req.body,{abortEarly:false});
    if (error) {
    return res.status(400).json({
      message: error.message,
      errors: error.details.map((detail) => detail.message), // Clean error messages
    });
   
}
next();
}

const updateNoteValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(30),
    tag:Joi.string().min(3).max(30)
  }).min(1); 

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      message: error.message,
      errors: error.details.map((detail) => detail.message),
    });
  }

  next();
};

module.exports = {addNoteValidation,updateNoteValidation};