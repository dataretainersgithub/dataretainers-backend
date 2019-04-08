const express =require('express');
const router =express.Router();
const config = require('../config/database');
const jwt =require('jsonwebtoken');
const jwt_auth = require('../config/jwtauth');
router.post('/shipdevicetobilling',(req,res)=>{
    console.log('value of device location'+req.body.devicelocation)
    status='Unsuccessful/'+req.body.devicelocation;
    config.query("update lead set status=? where id=?",[status,req.body.id],(err,result)=>{
  if(err){
 console.log('error while update ship device to billing '+err);
  }else{
    res.send(JSON.stringify({success:true,message:'successfully update ship device to billing address',shipdevicetobillingdata:result}));
    var   currentime = new Date().toLocaleString('en-US', {
       timeZone: 'America/Vancouver'
     });
     var currenttimestring = new Date(currentime);
config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'ship device to billing address')",[currenttimestring,status,req.body.agentname,req.body.usertype,req.body.id],(err,result)=>{
    if(err){
        console.log(err);
    }else{

    }
});

  }
    });
}); 

router.get('/getunsuccessfulcase',(req,res)=>{
config.query("select * from lead where status like 'unsuccessful%'",(err,result)=>{
if(err){
   
        console.log('error while getting unsuccessful case'+err);
   
}else{
    res.send(JSON.stringify({success:true,message:'fetched unsuccessful case',unsuccessfulcasedata:result}));
}
});
})
router.post('/getdisposedevice',(req,res)=>{
   
    status='Unsuccessful/'+req.body.devicelocation;
    config.query("update lead set status=? where id=?",[status,req.body.id],(err,result)=>{
  if(err){
 console.log('error while get dispose off device'+err);
  }else{
    res.send(JSON.stringify({success:true,message:'successfully update for dispose off device',shipdevicetobillingdata:result}));
    var   currentime = new Date().toLocaleString('en-US', {
       timeZone: 'America/Vancouver'
     });
     var currenttimestring = new Date(currentime);
config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'Dispose off Device')",[currenttimestring,status,req.body.agentname,req.body.usertype,req.body.id],(err,result)=>{
    if(err){
        console.log(err);
    }else{

    }
});

  }
    });
}); 


router.get('/getdiagnosticrequired',(req,res)=>{
    config.query("select * from lead where status like 'In Service/%'",(err,result)=>{
    if(err){
        console.log(err);
    }else{
        res.send(JSON.stringify({success:true,message:'successfully fetched diagnostic required',diagnosticrequired:result}));
    }
    })
})

router.post('/login',(req,res)=>{
if(!req.body.username){
res.send(JSON.stringify({success:false,message:'usename not provided'}));
}else{
   if(!req.body.password){
    res.send(JSON.stringify({success:false,message:'password not provided'}));
   }else{
       console.log('req password not provided'+req.body.password);
    config.query("select * from agents where username=? and usertype='shipping'",[req.body.username],(err,result)=>{
     if(err){
         console.log('error while shipping login'+err);
     }else{
     if(result.length==0){
        res.send(JSON.stringify({success:false,message:'username not found'}));
     }else{
        if(req.body.password==result[0].password){
               const token = jwt.sign({userName:result[0].username},jwt_auth.secret,{expiresIn:'24h'});
                res.json({success:true,message:'User login',token:token,user:{user:result[0].username}});
            }else{
                res.json({success:false,message:'Password Incorrect'}); 
            }
    
    }
     }
    });
   }
}
});
router.get('/statuspending',(req,res)=>{
    config.query("select * from lead where status='pending'",(err,result)=>{
    if(err){
        console.log('error while fetching data from lead by status pending '+err);
    }else{
        res.send(JSON.stringify({success:true,message:'successfully get lead data by status pending',pendingleaddata:result}));
    }
    });
    });

    
  
router.use((req,res,next)=>{

    const token= req.headers['authorization'];
    if(!token){
        res.json({success:false,message:'No token  provided'});
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
});
router.get('/getprofile',(req,res)=>{
    config.query("select * from agents where usertype='shipping'and username=?",[req.decoded.userName],(err,result)=>{
         if(err){
             console.log('error while getting technician data'+err);
         }else{
             res.send({success:true,message:'successfully fetch profile data',profiledata:result});
         }
    });
});



module.exports=router;