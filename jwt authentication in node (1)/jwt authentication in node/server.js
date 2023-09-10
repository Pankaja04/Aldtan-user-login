const express = require('express');
const mysql=require('mysql');
const path=require('path');
const app = express();
const dotenv=require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');


dotenv.config({path:'./.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    database: 'nodejs-login'
  });

  const publicDirectory=path.join(__dirname,'./public');
  app.use(express.static(publicDirectory));
  app.use(express.urlencoded({extended:false})); 
  app.use(express.json()); 
  app.use(cookieParser());
  app.set('view engine','hbs');

db.connect((error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySQL connected...");
    }
})


const uploadRoute = require('./routes/upload'); // Example route
app.use('/upload', uploadRoute); // Mount the route at '/upload'
app.use('/',require('./routes/page'));
app.use('/auth',require('./routes/auth'));
app.use('/download',require('./routes/page'));
app.listen(3000)