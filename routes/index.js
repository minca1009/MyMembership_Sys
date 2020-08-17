var express = require('express');
var router = express.Router();
var User = require('../models/users');
var path = require('path')
var app = express();
app.use(express.static('views'));

/* /根路徑 跳轉至login.html */
router.get('/', function(req, res, next) {
  res.render('login.ejs'); 
});
/* /a 跳轉至register.html */
router.get('/a', function(req, res, next) {
  res.render('register.ejs'); 
});


router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/register', function (req, res) {
    res.render('register');
});

// 這裏的業務邏輯將寫在 兩個post 路由裏 
router.post('/login', function (req, res) {
	var postData = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({
        username: postData.username,
        password: postData.password
    }, function (err, data) {
        if(err) throw err;
        if(data){
            res.send('登錄成功');
        }else{
            res.send('賬號或密碼錯誤')
        }
    } )
});
router.post('/register', function (req, res) {
    // 獲取用戶提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password,
    };
    // 查詢是否被註冊
    User.findOne({username: postData.username}, function (err, data) {
        if (data) {
            res.send('用戶名已被註冊');
        } else {
            // 保存到數據庫
            User.create(postData, function (err, data) {
                if (err) throw err;
                console.log('註冊成功');
                res.redirect('/userList');      // 重定向到所用用戶列表
            })
        }
    });
});

// 獲取所有用戶列表
router.get('/userList', function (req, res) {
    var userList = User.find({}, function (err, data) {
        if (err) throw  err;
        res.send(data)
    });
});

module.exports = router;