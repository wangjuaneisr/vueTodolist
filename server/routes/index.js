var express = require('express');
var router = express.Router();
const cors = require('koa2-cors');
var app = express();


 app.use(cors());

/* GET home page. */
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});


//引入连接数据库模块
const connection = require('./conn');
connection.connect(()=>{
  console.log('数据库连接成功！')
})

const commonErrorAndsend = function(name,err,data,res){
  console.log('end'+data)
  if(err){
    throw err;
  }else{
    res.send(data)
    console.log(name + 'send !')
  }

}
router.post('/checkLogin', function(req, res) {

  let { username,password } = req.body;
  //去数据库查询是否存在这个账号和密码的用户
  //执行sql查询
  const sqlStr = `select * from users where username='${username}' and password='${password}';`;
  connection.query(sqlStr,(err,data)=>{
    commonErrorAndsend('checkLogin',err,data,res);
  });
});

router.get('/getUserlist',function(req, res){
  const sql = 'select * from users';
  connection.query(sql,(err,data) => {

    commonErrorAndsend('getUserlist',err,data,res);
    // if(err){
    //   throw err;
    // }else{
    //   res.send(data)
    //   console.log('send !')
    // }
   
  })
})

router.post('/addUser',function(req, res){
  let { username,password,realname,age,idtype } = req.body;
  const sql = `insert into users(username,password,realname,age,idtype) values('${username}','${password}','${realname}','${age}','${idtype}');`;
  connection.query(sql,(err,data) => {
    commonErrorAndsend('addUser',err,data,res);
  })
})

router.post('/deleteUser',function(req, res){  
  let { id } = req.body;
  const sqlStr = `delete from users where id='${id}';`;
  connection.query(sqlStr,(err,data)=>{
    commonErrorAndsend('deleteUser',err,data,res);
  });
})


module.exports = router;

/* 
create database vuexms;
use vuexms;
create table users (
  id int primary key auto_increment,
  username varchar(50),
  password varchar(50),
  realname varchar(50),
  idType varchar(50)
);

insert into users(username,password,realname,idtype) values('admin','123456789','lixunhuan','522223333');
select * from users where username="admin" and password="123456789";
*/
