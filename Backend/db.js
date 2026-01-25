const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URL;
async function connectToMongo(){
    await mongoose.connect(mongoUri);
}
module.exports =connectToMongo;