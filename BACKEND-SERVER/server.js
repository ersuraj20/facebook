const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');


const app=express();
app.use(cors());
app.use(bodyparser.json());

const port=3000|process.env.port;

app.listen(port,()=>{
    console.log("server connected to port "+port);
});
