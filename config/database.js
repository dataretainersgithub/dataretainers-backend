var mysql = require('mysql');
var connection=mysql.createPool({
        host     : '107.180.2.75',
        user     : 'data_root',
        password : 'aezakmi@123',
        database : 'dataretainers',
});
module.exports=connection;