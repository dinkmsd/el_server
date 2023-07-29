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
        word: {type: String},
        meaning: {type: String},
        favourite: {type: Boolean},
        type: {type: String},
        describe: {type: String},
    }]
})
module.exports = mongoose.model("User", UserModel);