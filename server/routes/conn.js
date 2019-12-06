var mysql = require('mysql');

//创建连接
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin123',
  database : 'vuexms',
  useConnectionPooling: true
});
 
module.exports = connection;

// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });