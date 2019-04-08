
const express = require('express');
const router = express.Router();
const app = express(); 
const config =require('../config/database');
const schedule = require('node-schedule');
const http = require('http');
var CronJob = require('cron').CronJob;
const SocketIO =require('socket.io');
 const server = http.Server(app);
const io = SocketIO(server);


router.post('/insert:id',(req,res)=>{
    config.query('select commentid from updatewall order by commentid desc limit 1',function(err,resultid){
        if(err){
            console.log('error while fetching comments id'+err);
        }else{
            var   currentime = new Date().toLocaleString('en-US', {
                timeZone: 'America/Vancouver'
              });
              var currenttimestring = new Date(currentime);
          global.commetid22= Number(resultid[0].commentid) +1;
          config.query("insert into updatewall(remindercomment,remindertime,commenttime,caseno,commentid,updatedby,usertype) values(?,?,?,?,?,?,?)",[req.body.comment,req.body.remindertime,currenttimestring,req.params.id,commetid22,req.body.updatedby,req.body.usertype],(err,result)=>{ 
            if(err){
                console.log('error while inserting data into updatewall'+err);
            }else{
                var   currentime = new Date().toLocaleString('en-US', {
                    timeZone: 'America/Vancouver'
                  });
                  var currenttimestring = new Date(currentime);
             config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,remindertime,caseno,updatetype) values(?,?,?,?,?,?,'reminderupdate')",[currenttimestring,req.body.comment,req.body.updatedby,req.body.usertype,req.body.remindertime,req.params.id],(err,result)=>{
                 if(err){
                     console.log(err);
                 }else{

                 }
             });
                res.send(JSON.stringify({success:true,message:'comment is added in update wall',remindercomment:result}));
            }
        });
        }
});
});
router.get('/fetch:id',(req,res)=>{
    
          config.query('select remindercomment,remindertime,commenttime from updatewall where caseno=?',[req.params.id],(err,result)=>{
            if(err){
                throw err;
            }else{
                console.log(result.length);
                res.send(JSON.stringify({success:true,message:'comment value fetched',commentdata:result}));
              
            }
           });
        });

router.get('/getalert:id',(req,res)=>{
    console.log('value of id'+req.params.id);
    config.query('select * from selfalert where caseno=?',[req.params.id],(err,result)=>{
        if(err){
            throw err;
        }else{
            res.send(JSON.stringify({success:true,message:'self alert value fetched',alertdata:result}));
        };
    });
});

router.post('/submitalert:id',(req,res)=>{
    var   currentime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Vancouver'
      });
      var currenttimestring = new Date(currentime);
    config.query('insert into selfalert(caseno,self_alert_time,self_alert_remindertime,self_alert_comment,updatedby,usertype) values(?,?,?,?,?,?)',[req.params.id,currenttimestring,req.body.selfalertremindertime,req.body.alertcomment,req.body.updatedby,req.body.usertype],(err,result)=>{
    if(err){
        console.log(err);
    }else{
        var   currentime = new Date().toLocaleString('en-US', {
            timeZone: 'America/Vancouver'
          });
          var currenttimestring = new Date(currentime);
        config.query("insert into caseactivity(updatetime,comment,updatedby,usertype,remindertime,caseno,updatetype) values(?,?,?,?,?,?,'selfalertupdate')",[currenttimestring,req.body.alertcomment,req.body.updatedby,req.body.usertype,req.body.selfalertremindertime,req.params.id],(err,result)=>{
            if(err){
                console.log('error while save selfalert data'+err);
            }else{

            }
        });
       res.send(JSON.stringify({success:true,message:`self alert comment added`,selfalertdata:result}));
       var date = new Date(req.body.selfalertdate);

    }
    });
    });

module.exports =router;
