const express = require('express');
const router = express.Router();
const config = require('../config/database');


router.post('/filterbycase',(req,res)=>{
config.query("SELECT * FROM lead WHERE status=?",[req.body.filtervalue],(err,result)=>{
if(err){
    console.log('err while filter data by status '+err);
}else{
   
    res.send(JSON.stringify({success:true,message:'successfully get filter data',filterdata:result}));
}
})
});



router.post('/filterbyserviceplan',(req,res)=>{
    config.query("SELECT * FROM lead WHERE service=?",[req.body.filtervalue],(err,result)=>{
    if(err){
        console.log('err while filter data by service '+err);
    }else{
       
        res.send(JSON.stringify({success:true,message:'successfully get filter data',filterdata:result}));
    }
    })
    });

    router.post('/filterbycasemanager',(req,res)=>{
        config.query("SELECT * FROM lead WHERE casemanager=?",[req.body.filtervalue],(err,result)=>{
        if(err){
            console.log('err while filter data by case manager'+err);
        }else{
           
            res.send(JSON.stringify({success:true,message:'successfully get filter data',filterdata:result}));
        }
        })
        });

        router.post('/filterbycaseengineer',(req,res)=>{
            config.query("SELECT * FROM lead WHERE engineer=?",[req.body.filtervalue],(err,result)=>{
            if(err){
                console.log('err while filter data by case engineer'+err);
            }else{
               
                res.send(JSON.stringify({success:true,message:'successfully get filter data',filterdata:result}));
            }
            })
            });
            router.post('/filterbydate',(req,res)=>{
            
                config.query("select * from lead where date_time >=? AND date_time <=?",[req.body.filterfrom,req.body.filterto],(err,result)=>{
                if(err){
                    console.log('err while filter data by case date'+err);
                }else{
                   
                    res.send(JSON.stringify({success:true,message:'successfully get filter data',filterdata:result}));
                }
                })
                });
    
module.exports=  router;