const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewModel = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    image:{
        type: String,
    },
})

module.exports = mongoose.model("New", NewModel);