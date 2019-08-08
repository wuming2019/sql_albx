var express = require('express');
var querystring = require('querystring');
var session = require('express-session');
var app = express();

app.listen(8080, () => {
  console.log('http://127.0.0.1:8080');
});

// 开启session
app.use(session({
  // 加盐
  secret: 'keyboard cat', //相当于一个加密密钥，值可以是任意字符串
  resave: false, //强制session保存到session store中,不管Session有没有更新，都强制保存
  saveUninitialiazed: false //强制没有‘初始化’的session保存到storage中
}));

app.get('/', (req, res) => {
  // 使用方式都通过req.session进行处理
  // req.session是一个对象
  console.log(req.session)
  // res.end()

  if(req.session.isLogin && req.session.isLogin == 'true'){
    res.end('hello');
  }else{
    req.session.isLogin = 'true';
    // req.session.currentUser = {name: 'jack',age: 20}
    res.end('first come');
  }
})