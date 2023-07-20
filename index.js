const express = require('express');
const app = express();

const database = require('./database');
const User = require('./account.js');
const New = require('./new.js');

const bodyParser = require('body-parser');
const port = 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Connect Database
database.connect();

app.post('/api/user/register', async(req, res, next)=>{
    const {fullname, phone, email, password } = req.body;
    try {
        await User.findOne({phone: phone}).then(async user => {
            if (!user){
                let data = {
                    fullname: fullname,
                    phone: phone,
                    email:email,
                    password: password,
                }
                await User(data).save()
                return res.status(200).json({success: true, record: fullname})
            }else{
                return res.status(300).json({success: false, msg: 'Account existed !'})
            }
        })
        
    } catch (error) {
        return res.status(500).json({success: false, msg: 'Server error!'})
        
    }
})
app.post('/api/user/login', async(req, res, next)=>{
    const {phone, password} = req.body;
    try {
        await User.findOne({phone: phone}).then(async user => {
            if (!user){
                return res.status(300).json({success: false, msg: 'Account is not found'})
            }else{
                if (password == user.password){
                    return res.status(200).json({success: true, record: user})
                } else{
                    return res.status(300).json({success: false, msg: 'Password Incorrect !'})
                }
            }
        })
        
    } catch (error) {
        return res.status(500).json({success: false, msg: 'Server error!'})
        
    }
})

app.get('/api/news', async(req, res, next)=>{
    try {
        const result = await New.find({});
        res.json(result);
    } catch (e) {
        console.log('Network Error!!');
    }
    
});





app.listen(port, ()=>{
    console.log(`Server: ${port}`);
})