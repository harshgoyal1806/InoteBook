const mongoose = require("mongoose");
const {Schema} = mongoose;
const notesSchema = new Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId, // links to User
    ref: "user",
    required: true,
  },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        required:true,
        default:"general"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Notes = mongoose.model("notes",notesSchema);
module.exports = Notes;