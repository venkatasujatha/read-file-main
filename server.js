const express = require('express');
const app = express();
const router =require('./router/router');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);

const multer = require('multer');
const path = require('path');

  
async function run() {
    try{
        app.listen(process.env.port, ()=>{
            console.log(`server listening on port ${process.env.port}`);
        })
    }
    catch(error)
    { 
        console.error(error.message);
    }
   
}
run();