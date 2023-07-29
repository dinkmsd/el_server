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

app.post('/user/register', async(req, res, next)=>{
    const {fullname, username, email, password } = req.body;
    
    try {
        await User.findOne({username: username}).then(async user => {
            if (!user){
                const data = {
                    fullname: fullname,
                    username: username,
                    email: email,
                    password: password,
                    listWords: [],
                }
                await User(data).save();

                return res.status(200).json({success: true, record: username})
            }else{
                return res.status(300).json({success: false, msg: 'Account existed !'})
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, msg: 'Server error!'})
        
    }
})

app.post('/user/login', async(req, res, next)=>{
    const {username, password} = req.body;
    try {
        await User.findOne({username: username}).then(async user => {
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

app.post('/user/add-new-word', async(req, res, next)=>{
    const { username, word, meaning, favourite, type, describe, } = req.body;
  
  try {
    // Tìm người dùng trong cơ sở dữ liệu
    
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại.' });
    }

    // Thêm từ mới vào danh sách từ điển của người dùng
    const dummy = {type: type, meaning: meaning, word: word, favourite: favourite, describe: describe};
    user.listWords.push(dummy);
    await user.save();

    return res.status(201).json({ message: 'Thêm từ mới thành công.', listWords: user.listWords });
  } catch (error) {
    console.error('Lỗi khi thêm từ mới:', req.body);
    return res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm từ mới.' });
  }
});

app.get('/list-word/:username', async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập.' });
    }

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ username });

        if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
        }

        // Trả về danh sách từ điển của người dùng
        return res.status(200).json({ listWords: user.listWords });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách từ điển:', error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy danh sách từ điển.' });
    }
});
  

app.delete('/delete-word/:username/:word', async (req, res) => {
    const { username, word } = req.params;
  
    if (!username || !word) {
      return res.status(400).json({ message: 'Vui lòng nhập tên đăng nhập và từ cần xoá.' });
    }
  
    try {
      // Tìm người dùng trong cơ sở dữ liệu
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: 'Người dùng không tồn tại.' });
      }
  
      // Tìm từ trong danh sách từ điển của người dùng
      const wordIndex = user.listWords.findIndex(entry => entry.word === word);
      if (wordIndex === -1) {
        return res.status(404).json({ message: 'Từ không tồn tại trong danh sách từ điển.' });
      }
  
      // Xoá từ khỏi danh sách từ điển của người dùng
      user.listWords.splice(wordIndex, 1);
      await user.save();
  
      return res.status(200).json({ message: 'Xoá từ thành công.', listWords: user.listWords });
    } catch (error) {
      console.error('Lỗi khi xoá từ:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi xoá từ.' });
    }
  });

app.get('/news', async(req, res, next)=>{
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