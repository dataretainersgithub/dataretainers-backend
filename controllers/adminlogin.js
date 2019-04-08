const express = require('express');
const router = express.Router();
const app = express(); 
const cors = require('cors'); 
app.use(cors({credentials: true, origin: true}));
const lead_data = require('../models/admin_login');
const config =require('../config/database');
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/jwtauth'); 
//get http method to /main
router.get('/',(req,res)=>{
  
  lead_data.getAdminLogin((err,agentlogin)=>{
  if(err){
   
      res.json({success:false,message:`failed to load all lead list Error:${err}`});
  }
  else{
   
      res.send(JSON.stringify({success:true,agentlogin:agentlogin},null,2));
     
  }
  });
});

router.post('/login',(req,res)=>{
    if(!req.body.username){
        res.json({success:false,message:'username is not provided'})
    }else{
        config.query('select admin_user,password from admin where  admin_user=?',[req.body.username],function(err,user){
            if(user.length==0){
                res.json({success:false,message:'Admin not found'});
                
            }else{
                if(req.body.password==user[0].password){
                    const token = jwt.sign({userName:user[0].admin_user},
                    jwt_auth.secret,{expiresIn:'24h'});
                    res.json({success:true,message:'Admin Login',token:token,user:{user:user[0].admin_user}});
                }else{
                    res.json({success:false,message:'password incorrect'});
                }
            }
        })
    }
});


router.use((req,res,next)=>{
    const token= req.headers['authorization'];
    if(!token){
        res.json({success:false,message:'No token provided'});
    }else{
        jwt.verify(token,jwt_auth.secret,(err,decoded)=>{
            if(err){
                res.json({success:false,message:'Token invalid: '+jwt_auth.secret+'hell/n'+token});
            }else{
                req.decoded=decoded;
                next();
            }
        })
    }
})

router.get('/profile',(req,res)=>{
    config.query('select * from admin where admin_user =?',[req.decoded.userName],function(err,user){
        if(user.length==0){
            res.json({success:false,message:'User not found'});
        }else{
           
                res.json({success:true,user:user,message:user});
            }
        
   
    })
});
module.exports =router;