const express = require('express');
const router = express.Router();
const config = require('../config/database');
const jwt_auth = require('../config/jwtauth');
const jwt = require('jsonwebtoken');
router.post('/login',(req,res,next)=>{
if(!req.body.username){
    res.send(JSON.stringify({success:false,message:'Username is not provided'}));
}else{
    if(!req.body.password){
        res.send(JSON.stringify({success:false,message:'password is not provided'}));
    }else{
    config.query("select * from agents where username=? and usertype='cancelationsales'",[req.body.username],(err,user)=>{
        if(user.length ==0){
            res.send(JSON.stringify({success:false,message:'user not found'}));
        }else{
            if(req.body.password != user[0].password){
                res.send(JSON.stringify({success:false,message:'Incorrect Password'}));
             }else{
                const token = jwt.sign({userName:user[0].username},jwt_auth.secret,{expiresIn:'24h'});
                res.json({success:true,message:'User login',token:token,user:{user:user[0].username}});
             }
        }
    
    });
}
}
})

module.exports=router;