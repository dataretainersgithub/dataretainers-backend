const mysql = require('mysql');
const config =require('../config/database');
module.exports.getAgentLogin=(callback)=>{
return config.query('select * from agents',callback);
}
