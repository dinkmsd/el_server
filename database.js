const mongoose = require('mongoose');
const uri_compass = "mongodb://localhost:27017/englishapp"
const uri_atlas = "mongodb+srv://namloveheo123:123456789Nam@cluster0.p8o1a0s.mongodb.net/englishapp?retryWrites=true&w=majority";
async function connect() {
    try {
        await mongoose.set('strictQuery', true);
        await mongoose.connect(uri_atlas, {
            useNewUrlParser: true
        })
        console.log('connect db success')
    } catch (error) {
        console.log(error)
    }
};
module.exports = { connect };