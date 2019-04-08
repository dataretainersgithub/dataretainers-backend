const express = require('express');
const router = express.Router();
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/jwtauth'); 
router.post('/login',(req,res)=>{
if(!req.body.username){
    res.json({success:false,message:'username is not provided'});
}else{
  if(!req.body.password){
    res.json({success:false,message:'password is not provided'});
  }else{
   config.query("select * from agents where username=? and usertype='technician'",[req.body.username],(err,user)=>{
       if(err){
           console.log('value technician login'+err)
       }else{
        if(user.length==0){
            res.json({success:false,message:'Technician not found'});  
           }else{
            if(req.body.password==user[0].password){
                   const token = jwt.sign({userName:user[0].username},jwt_auth.secret,{expiresIn:'24h'});
                    res.json({success:true,message:'User login',token:token,user:{user:user[0].username}});
                }else{
                    res.json({success:false,message:'Password Incorrect'}); 
                }
            
        }
       }
       
   });
  }
}
});
router.get('/getadmindata',(req,res)=>{
    config.query("select * from technicianupdate where usertype='admin'",(err,result)=>{
    if(err){
        console.log('error while fetching data from technicianupdate '+err);
    }else{
        res.send({success:true,message:'fetch data from technicain update',techniciandata:result})
    }
    });
});



router.get('/getgoaheadcases',(req,res)=>{
    config.query("select * from lead where status='In Service With Go Ahead'",(err,result)=>{
    if(err){
        console.log('error while fetching data from goaheadcases '+err);
    }else{
        res.send({success:true,message:'fetch data from lead for goaheadcases',goaheadcasedata:result});
    }
    });
});

router.post('/getpaidresulttocasemanager',(req,res)=>{
config.query("select * from dataextracted WHERE caseno in(select id from lead where casemanager =?) and isfinalpayment ='false'",[req.body.agent],(err,result)=>{

if(err){
    console.log('error while fetching data  from dataextracted '+err);
}else{
    res.send({success:true,message:'fetch data from data extracted',getpaidresult:result});
}

});
});

router.get('/getpaidresulttoadmin',(req,res)=>{
    config.query("select * from dataextracted where isfinalpayment ='false'",[req.body.agent],(err,result)=>{
    
    if(err){
        console.log('error while fetching data  from dataextracted '+err);
    }else{
        res.send({success:true,message:'fetch data from data extracted',getpaidresult:result});
    }
    
    });
    });
router.post('/diagnosticscomplete',(req,res)=>{
  
    var   currentime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Vancouver'
      });
      var currenttimestring = new Date(currentime);
    config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'diagnosticscompleted')",[currenttimestring,req.body.comment,req.body.updatedby,req.body.usertype,req.body.caseno],(err,result)=>{
        if(err){
            console.log('error while save selfalert data'+err);
        }else{
            res.send({success:true,message:'Your comment updated successfully',diagnosticscomplete:result}); 
        }
    });


});
router.post('/updateunsuccessful',(req,res)=>{

    var   currentime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Vancouver'
      });
      var currenttimestring = new Date(currentime);
    config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'updateunsuccessful')",[currenttimestring,req.body.comment,req.body.updatedby,req.body.usertype,req.body.caseno],(err,result)=>{
        if(err){
            console.log('error while save selfalert data'+err);
        }else{
            res.send({success:true,message:'Your comment updated successfully',updateunsuccesfulldata:result}); 

            config.query("update lead set status='Advice Unsuccessful-Location' where id=?",[req.body.caseno],(err,result)=>{
              if(err){
                  console.log('error while updating advice unsuccessful '+err);
              }
              else{
                 // console.log('successfully updated status');
              }
            });
        }
    });

});
router.post('/dataextracted',(req,res)=>{
  
    var   currentime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Vancouver'
      });
      var currenttimestring = new Date(currentime);
    config.query("insert into dataextracted(updatetime,comment,updatedby,usertype,caseno) values(?,?,?,?,?)",[currenttimestring,req.body.comment,req.body.updatedby,req.body.usertype,req.body.caseno],(err,result)=>{
        if(err){
            console.log('error while save data extracted'+err);
        }else{
            res.send({success:true,message:'Your data extracted comment updated successfully',dataextracted:result}); 
            var  currentime = new Date().toLocaleString('en-US', {
                timeZone: 'America/Vancouver'
              });
              var currenttimestring = new Date(currentime);
            config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'dataextracted')",[currenttimestring,req.body.comment,req.body.updatedby,req.body.usertype,req.body.caseno],(err,result)=>{
                if(err){
                    console.log('error while save selfalert data'+err);
                }else{
                 //console.log('save data successfully');  
                }
            });
        }
    });


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
});

router.get('/getprofile',(req,res)=>{
    config.query("select * from agents where usertype='technician'and username=?",[req.decoded.userName],(err,result)=>{
         if(err){
             console.log('error while getting technician data'+err);
         }else{
             res.send({success:true,message:'successfully fetch profile data',profiledata:result});
         }
    });
});

router.post('/update',(req,res)=>{
    var   currentime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Vancouver'
      });
      var currenttimestring = new Date(currentime); 
    config.query("insert into technicianupdate(caseno,techniciancomment,updatetime,usertype,updatedby) values(?,?,?,?,?)",[req.body.caseno,req.body.techniciancomment,currenttimestring,req.body.usertype,req.body.updatedby],(err,result)=>{
     if(err){
         console.log('error in insert technician data'+err);
     }else{

        var   currentime = new Date().toLocaleString('en-US', {
            timeZone: 'America/Vancouver'
          });
          var currenttimestring = new Date(currentime);
        config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'technicianupdate')",[currenttimestring,req.body.techniciancomment,req.body.updatedby,req.body.usertype,req.body.caseno],(err,result)=>{
            if(err){
                console.log('error while save selfalert data'+err);
            }else{

            }
        });

         res.send({success:true,message:'successfully insert technician data',techniciandata:result});
     }
    });
});

router.get('/getdata',(req,res)=>{
    config.query("select * from technicianupdate",(err,result)=>{
    if(err){
        console.log('error while fetching data from technicianupdate '+err);
    }else{
        res.send({success:true,message:'fetch data from technicain update',techniciandata:result})
    }
    });
});



module.exports=router;