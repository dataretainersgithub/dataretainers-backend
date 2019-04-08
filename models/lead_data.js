const mysql = require('mysql');
const config =require('../config/database');
module.exports.getAllLeadList=(callback)=>{
return config.query('select * from lead',callback);
}
