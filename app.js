/*We’ll declare all our dependencies here */
const express = require('express'); 
const path = require('path');
const mysql =require('mysql');
 const bodyParser = require('body-parser');
  const cors = require('cors'); 
 const app = express(); 
 const port = 3000;
 const config =require('./config/database');
 const mainpage = require('./controllers/main');
 const agentlogin = require('./controllers/agentlogin');
 const adminlogin =require('./controllers/adminlogin');
 const newcaseroute = require('./controllers/newcase');
 const addcomment = require('./controllers/addcomment');
 const quotes = require('./controllers/quotes');
 const adminattention = require('./controllers/adminattention');
 const technician = require('./controllers/technician');
 const shipping = require('./controllers/shipping');
 const filter = require('./controllers/filterdata');
 const cancelationsales = require('./controllers/cancelationsales');
 const mysqlwatch =require('./models/mysqlwatcher');
 const http = require('http');
 const SocketIO =require('socket.io');
 const server = http.Server(app);
 const io = SocketIO(server);
 process.env.TZ = 'America/Los_Angeles';
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json()); 
 app.use(cors({credentials: true, origin: true}));
 app.use('/main',mainpage);
app.use('/agent',agentlogin);
app.use('/admin',adminlogin);
app.use('/newcase',newcaseroute);
app.use('/addcomment',addcomment);
app.use('/quotes',quotes);
app.use('/adminattention',adminattention);
app.use('/technician',technician);
app.use('/shipping',shipping);
app.use('/filter',filter);
app.use('/cancelationsales',cancelationsales);
//Middleware for CORS
/*express.static is a built in middleware function to serve static files. We are telling express server public folder is the place to look for the static files */ 
 app.use(express.static(path.join(__dirname, 'public')));
 app.get('/', (req,res) => { res.send("Invalid page"); });
//Listen to port 3000 
 server.listen(port, () => { console.log(`Starting the server at port ${port}`); });