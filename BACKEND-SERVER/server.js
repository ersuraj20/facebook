const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');
const { userError } = require('@angular/compiler-cli/src/transformers/util');

const app=express();
app.use(cors());
app.use(bodyparser.json());

const port=3000|process.env.port;

//database conection
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'mysql',
    database:'fb_db',
    port:3306
})

// check database connection
db.connect(err=>{
    if(err)
    console.error(err,'dberr');
    else
    console.log('database connected...');
})

//get all users from fb_db.users
app.get('/users',(req,res)=>{
    
    let qr='select * from users;';
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errors');
        }
        if(result.length>0){
            res.send({
                message:'All user data',
                data:result
            });
        }
    })
})

// get single user from fb_db.users
app.get('/user/:id',(req,res)=>{
    let uid=req.params.id;
    let qr=`select * from users where id=${uid};`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errors');
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }
        else{
            res.send({
                message:'No user found'
            });
        }
    })

})

//post a user
app.post('/user',(req,res)=>{

    let uname=req.body.username;
    let pwd=req.body.password;

    // console.log('username is '+uname);
    // console.log('pasword is '+pwd);

    let qr=`insert into users (username,password) values ('${uname}', '${pwd}');`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errors');
        }
        else{
            res.send({
                message:'User Added..'
            })
        }
      
    })

})

app.listen(port,()=>{
    console.log("server connected to port "+port);
});
