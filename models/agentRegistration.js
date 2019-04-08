const express = require('express');
const router = express.Router();
const app = express(); 
const cors = require('cors'); 
const mysql = require('mysql');
const config =require('../config/database');
app.use(cors({credentials: true, origin: true}));

router.post('/',(req,res)=>{
    var agentdata={
        "username":req.body.username,
        "password":req.body.password
    }
   config.query('INSERT INTO agents SET ?',agentdata,function(error,results,fields){
       if(error){
           console("user not registered",error);
       }else{
           console.log('user is registered',results);
           res.send({
               "code":200,
               "success":"user registered successfully"
           });
       }
       
   });
});
module.exports=router;