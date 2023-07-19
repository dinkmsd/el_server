const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    fullname:{
        type: String
    },
    password:{
        type: String
    },
    phone:{
        type: String,
        unique: true,
    },
    email:{
        type: String
    },
})
module.exports = mongoose.model("User", UserModel);