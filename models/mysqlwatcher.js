

const config =require('../config/database');

     global.previd;
     global.newid;
 
  var mysqlwatch =function(){
    config.query('select id from lead ORDER BY id DESC LIMIT 1',function(err,result1){
    
    global.previd=result1[0].id;
    console.log(global.previd);
  
  })
   setInterval(function(){
    
    config.query('select id from lead ORDER BY id DESC LIMIT 1',function(err,result2){
        this.newid=result2[0].id;
        console.log(this.newid);
        if(this.newid > global.previd){
            console.log('if statement');
            query1='select * from lead where id=' + this.newid + ' limit 1';
            console.log(query1);
            config.query(query1,function(err,result3){
                if(err)
                { 
                    throw err;
                }else{
                    return result3;
               
                   
                }
                
            });
            global.previd= this.newid;
        }
      });
      
  },5000);
  }
module.exports =mysqlwatch;
/*
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
  try {
    const result4= config.query('select id from lead ORDER BY id DESC LIMIT 1',function(err,result2){
        this.newid=result2[0].id;
        console.log(this.newid);
        if(this.newid > global.previd){
            console.log('if statement');
            query1='select * from lead where id=' + this.newid + ' limit 1';
            console.log(query1);
            config.query(query1,function(err,result3){
                if(err)
                { 
                    throw err;
                }else{
                    return result3;
                   
                }
                
            });
            global.previd= this.newid;
        }
      });
    socket.emit("FromAPI", result4);
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}`));*/


