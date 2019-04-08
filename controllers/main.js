const express = require('express');
const router = express.Router();
const app = express(); 
const cors = require('cors'); 
app.use(cors({credentials: true, origin: true}));
const mysql = require('mysql');
const config =require('../config/database');
 
const lead_data = require('../models/lead_data');
//get http method to /main
router.get('/',(req,res)=>{
  
    lead_data.getAllLeadList((err,lists)=>{
    if(err){
     
        res.json({success:false,message:`failed to load all lead list Error:${err}`});
    }
    else{
     
        res.write(JSON.stringify({success:true,lists:lists},null,2));
        res.end();
    }
    });
});
router.get('/getactivitystatus/:id',(req,res)=>{
config.query('select * from caseactivity where caseno=? order by updatetime desc',[req.params.id],(err,result)=>{
    if(err){

    }else{
        res.send(JSON.stringify({success:true,message:'Fetched Case Activity Data Successfully',caseactivitydata:result}));
    }
})
});
router.post('/getupdatesbyagent',(req,res)=>{
  
    config.query('select * from updatewall where updatedby=?',[req.body.username],(err,result)=>{
      if(err){
          console.log('error while fetching updatewall '+err);
      }else{
          res.send(JSON.stringify({success:true,message:'successfully fetched data for agent todo',todolist:result}));
      }
    });
});
router.post('/removetodo',(req,res)=>{
  
    config.query("update updatewall set istodoremove='true' where commentid=?",[req.body.todoid],(err,result)=>{
      if(err){
          console.log('error while updating istodoremove '+err);
      }else{

        var   currentime = new Date().toLocaleString('en-US', {
            timeZone: 'America/Vancouver'
          });
          var currenttimestring = new Date(currentime);
        config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,caseno,updatetype) values(?,'Reminder Remove By Agent',?,?,?,'reminderupdate')",[currenttimestring,req.body.username,req.body.usertype,req.body.caseno],(err,result)=>{
            if(err){
                console.log('error while save selfalert data'+err);
            }else{

            }
        });

          res.send(JSON.stringify({success:true,message:'successfully update istodoremove data',todolist:result}));
      }
    });
});
router.post('/getupdatesbyagent',(req,res)=>{
  
    config.query('select * from updatewall where updatedby=?',[req.body.username],(err,result)=>{
      if(err){
          console.log('error while fetching updatewall '+err);
      }else{
          res.send(JSON.stringify({success:true,message:'successfully fetched data for agent todo',todolist:result}));
      }
    });
});
router.get('/selfalertdata',(req,res)=>{
  
    config.query("select * from selfalert where isselfalertnoticed !='true'",(err,result)=>{
      if(err){
          console.log('error while fetching data for selfalert '+err);
      }else{
          res.send(JSON.stringify({success:true,message:'successfully fetch selfalert data',selfalertdata:result}));
      }
    });
});

router.post('/removeselfalert',(req,res)=>{
  console.log('value of self alert'+req.body.selfalertid);
    config.query("update selfalert set isselfalertnoticed='true' where selfalertid=?",[req.body.selfalertid],(err,result)=>{
      if(err){
          console.log('error while updating selfalertdata  '+err);
      }else{
          res.send(JSON.stringify({success:true,message:'successfully updated selfalert data',selfalertdata:result}));
      }
    });
});
module.exports =router;