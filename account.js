const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username:{
        type: String
    },
    fullname:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    listWords:[{
        word: String,
        meaning: String,
        favourite: Boolean,
        type: String,
        describe: String,
    }]
})
module.exports = mongoose.model("User", UserModel);