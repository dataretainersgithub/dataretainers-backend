const express = require('express');
const router = express.Router();
const app = express(); 
const cors = require('cors'); 
app.use(cors({credentials: true, origin: true}));
const lead_data = require('../models/admin_login');
const config =require('../config/database');
const jwt = require('jsonwebtoken');
const jwt_auth = require('../config/jwtauth'); 
var   currentime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Vancouver'
  });
  var currenttimestring = new Date(currentime);

//set attention data to database
router.post('/setattentiondata/:id',(req,res)=>{
    if(req.body.attentiontype=='requestprice'){
 

     /*   config.query('select * from adminattention where userid=?',[req.params.id],(err,result)=>{
            if(err){
                console.log('error while updating admin attention'+err);
            }else{
                if(result.length>0){
                config.query("update adminattention set adminattentionstatus=?,adminattentioncomment=?,requestpriceattention='true' where userid=?",[req.body.status,req.body.adminattentioncomment,req.params.id],(err,result)=>{
                    if(err){
                        console.log('error while updating adminattention status'+err);
                    }else{
                        res.send(JSON.stringify({success:true,message:'admin attention data updated successfully',adminattentiondata:result}));
                    }
                });
            }else{*/
                var   currentime = new Date().toLocaleString('en-US', {
                    timeZone: 'America/Vancouver'
                  });
                  var currenttimestring = new Date(currentime); 
config.query("insert into adminattention(caseno,updatedby,adminattentioncomment,usertype,attentiontype,adminattentiontime) values(?,?,?,?,'requestprice',?)",[req.params.id,req.body.username,req.body.adminattentioncomment,req.body.usertype
,currenttimestring],(err,result)=>{
    if(err){
   console.log('error while set admin attention '+err);
    }else{
        var   currentime = new Date().toLocaleString('en-US', {
            timeZone: 'America/Vancouver'
          });
          var currenttimestring = new Date(currentime);
        config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'adminattentionrequestprice')",[currenttimestring,req.body.adminattentioncomment,req.body.username,req.body.usertype,req.params.id],(err,result)=>{
            if(err){
                console.log('error while save selfalert data'+err);
            }else{

            }
        });
        res.send(JSON.stringify({success:true,message:'set admin attention data successfully',adminattentiondata:result}));
    }
});
    }

    
    if(req.body.attentiontype=='othersattention'){
  /*      config.query('select * from adminattention where userid=?',[req.params.id],(err,result)=>{
            if(err){
                console.log('error while updating admin attention'+err);
            }else{
                if(result.length>0){
                config.query("update adminattention set adminattentionstatus=?,othersattentioncomment=?,otherattention='true' where userid=?",[req.body.status,req.body.adminattentioncomment,req.params.id],(err,result)=>{
                    if(err){
                        console.log('error while updating adminattention status'+err);
                    }else{
                        res.send(JSON.stringify({success:true,message:'admin attention data updated successfully',adminattentiondata:result}));
                    }
                })
                }else{*/

                    var   currentime = new Date().toLocaleString('en-US', {
                        timeZone: 'America/Vancouver'
                      });
                      var currenttimestring = new Date(currentime);
                    config.query("insert into adminattention(caseno,updatedby,adminattentioncomment,usertype,attentiontype,adminattentiontime) values(?,?,?,?,'othersattention',?)",[req.params.id,req.body.username,req.body.adminattentioncomment,req.body.usertype,currenttimestring
                        ],(err,result)=>{
                        if(err){
                       console.log('error while set admin attention '+err);
                        }else{
                            var   currentime = new Date().toLocaleString('en-US', {
                                timeZone: 'America/Vancouver'
                              });
                              var currenttimestring = new Date(currentime);
                            config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,?,?,?,?,'adminotherattention')",[currenttimestring,req.body.adminattentioncomment,req.body.username,req.body.usertype,req.params.id],(err,result)=>{
                                if(err){
                                    console.log('error while save selfalert data'+err);
                                }else{
                    
                                }
                            });
                            res.send(JSON.stringify({success:true,message:'set admin attention data successfully',adminattentiondata:result}));
                        }
                    });
                }
         if(req.body.usertype=='admin'){
            config.query("update adminattention set isadminreplied='true' where caseno=?",[req.params.id],(err,result)=>{
            if(err){
                console.log('err while updating the isadminreplied '+err);
            }else{
               
            }
            });
         }
     
           
});
router.get('/getattentiondata',(req,res)=>{
    config.query("select * from adminattention where  attentiontype='requestprice'",function(err,result){
        if(err){
            console.log(err);
        }else{
            res.send(JSON.stringify({success:true,message:'get admin data successfully',adminattentiondata:result}));
        }
    });
});
router.get('/getotherattentiondata',(req,res)=>{

config.query("select * from adminattention where  attentiontype='othersattention'",(err,result)=>{
    if(err){
        console.log('error while fetching data for otherattention data'+err);

    }else{
        res.send(JSON.stringify({success:true,message:'get other attention succcessfully',
    otherattentiondata:result}));
    }
});
});
module.exports =router;