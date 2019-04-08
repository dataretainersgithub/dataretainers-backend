const express = require('express');
const router = express.Router();
const config =require('../config/database');

 

    router.get('/',(req,res)=>{
     
        query1="select * from lead where  status='New Unassigned'";
        
        config.query(query1,function(err,result3){
            if(err)
            { 
                res.send({success:false});
                res.json({success:false,message:'Agent not assign'})
            }else{
               console.log('result3');
               res.write(JSON.stringify({success:true,newcase:result3},null,2));
               res.end();
                 
            }
            
        });
});
router.post('/getmediainfo',(req,res)=>{
 
    config.query('select * from media_information where caseno=?',[req.body.casevalue],function(err,result){
        if(err )
            { 
                
                
                 
                res.send({success:false});
                res.json({success:false,message:'Agent not assign'})
            }else{
                
    res.send(JSON.stringify({success:true,media:result,message:'Getting Media Information'},null,2));
console.log(result);
    
            }
    });
});


router.get('/:id',(req,res)=>{
   
    config.query('select * from lead where id= ?',[req.params.id],function(err,result){
        res.send(JSON.stringify({success:true,newcasebyid:result},null,2));
       
    });
});


router.post('/update/:id',(req,res)=>{

    config.query("select * from dataextracted where isfinalpayment='true' and caseno=?",[req.params.id],(err,resultpayment)=>{
      if(err){
          console.log('err while getting isfinalpayment');
      }
      console.log('value of the result payment '+resultpayment.length)
      if(resultpayment.length == 0){
        if(req.body.field=='engineer'){
            config.query('update lead set engineer=? where id=?',[req.body.value,req.params.id],function(err,result){
                res.send(JSON.stringify({success:true,message:"engineer name updated successfully",updatecase:result},null,2))
            });
            }
        if(req.body.field=='casemanager'){
            config.query('update lead set casemanager=? where id=?',[req.body.value,req.params.id],function(err,result){
                res.send(JSON.stringify({success:true,message:"casemanager name updated successfully",updatecase:result},null,2))
            });
            }
    if(req.body.field=='firstname'){
    config.query('update lead set firstname=? where id=?',[req.body.value,req.params.id],function(err,result){
        res.send(JSON.stringify({success:true,message:"firstname updated successfully",updatecase:result},null,2))
    });
    }
    
        if(req.body.field=='lastname'){
            config.query('update lead set lastname=? where id=?',[req.body.value,req.params.id],function(err,result){
                res.send(JSON.stringify({success:true,message:"lastname updated successfully",updatecase:result},null,2))
            });
            }
            if(req.body.field=='phone'){
                config.query('update lead set phone=? where id=?',[req.body.value,req.params.id],function(err,result){
                    res.send(JSON.stringify({success:true,message:"phone number updated successfully",updatecase:result},null,2))
                });
                }
                if(req.body.field=='email'){
                    config.query('update lead set email=? where id=?',[req.body.value,req.params.id],function(err,result){
                        res.send(JSON.stringify({success:true,message:"email updated successfully",updatecase:result},null,2))
                    });
                    }
                    if(req.body.field=='device_type'){
                       // console.log('get caseno value '+req.body.casevalue)
                        config.query('update media_information set device_type=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                            res.send(JSON.stringify({success:true,message:"device type updated successfully",updatecase:result},null,2))
                        });
                        }
    
                        if(req.body.field=='street'){
    
                        config.query('update lead set street=? where id=?',[req.body.value,req.params.id],function(err,result){
                            res.send(JSON.stringify({success:true,message:" street updated",updatecase:result},null,2));
                        });
                    }
                        if(req.body.field=='city'){
                          config.query('update lead set city=? where id=?',[req.body.value,req.params.id],function(err,result){
                              res.send(JSON.stringify({success:true,message:'city updated',updatecase:result},null,2));
                          });
                        }
                      if(req.body.field=='state'){
                          config.query('update lead set state=? where id=?',[req.body.value,req.params.id],function(err,result){
                              res.send(JSON.stringify({success:true,message:'state updated',updatecase:result},null,2));
                          });
                      }
                      if(req.body.field=='zip'){
                          config.query('update lead set zip=? where id=?',[req.body.value,req.params.id],function(err,result){
                              res.send(JSON.stringify({success:true,message:'zip updated',updatecase:result},null,2));
                          })
                      }
                      if(req.body.field=='country'){
                          config.query('update lead set country=? where id=?',[req.body.value,req.params.id],function(err,result){
                              res.send(JSON.stringify({success:true,message:'country updated',updatecase:result},null,2));
                          });
                      }
                        if(req.body.field=='device_manufacturer')
                        {
                           
                           
                            config.query('update media_information set device_manufacturer=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                                res.send(JSON.stringify({success:true,message:"device type updated",updatecase:result},null,2))
                            });
                            }
                        if(req.body.field=='device_capacity'){
                               
                                config.query('update media_information set device_capacity=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                                    res.send(JSON.stringify({success:true,message:"device type updated",updatecase:result},null,2))
                                });
                                }
                    if(req.body.field=='device_model'){
                        console.log('get caseno value '+req.body.casevalue)
                        config.query('update media_information set device_model=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                            res.send(JSON.stringify({success:true,message:"device type updated",updatecase:result},null,2))
                        });
                    }
                    if(req.body.field=='device_serialno'){
                        console.log('get caseno value '+req.body.casevalue)
                        config.query('update media_information set device_serialno=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                            res.send(JSON.stringify({success:true,message:"device serial number updated",updatecase:result},null,2))
                        });
                    }
                    if(req.body.field=='cnn_failure'){
                        console.log('get caseno value '+req.body.casevalue)
                        config.query('update media_information set cnn_failure=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                            res.send(JSON.stringify({success:true,message:"device type updated",updatecase:result},null,2))
                        });
                    }
                    if(req.body.field=='recovery_attempts'){
                        console.log('get caseno value '+req.body.casevalue)
                        config.query('update media_information set  recovery_attempts=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                            res.send(JSON.stringify({success:true,message:"device type updated",updatecase:result},null,2))
                        });
                    }
                    if(req.body.field=='file_folder'){
                        console.log('get caseno value '+req.body.casevalue)
                        config.query('update media_information set file_folder=? where caseno=?',[req.body.value,req.body.casevalue],function(err,result){
                            res.send(JSON.stringify({success:true,message:"device type updated",updatecase:result},null,2))
                        });
                    }
      }
      else{
          console.log('final payment is made');
        res.send(JSON.stringify({success:false,status:2,message:"Unable to eidt final payment"},null,2))
      }
    });
  
});

module.exports =router;
