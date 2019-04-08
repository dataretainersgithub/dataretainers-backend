const mysql = require('mysql');
const config =require('../config/database');
module.exports.getAdminLogin=(callback)=>{
return config.query('select * from admin',callback);
}
