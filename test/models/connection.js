import loadYaml from '../config/load-yaml';

let config = loadYaml()

//console.log(config)

let mysql  = require('mysql');

let connection = mysql.createConnection({
    host     : config.database.default.host,//'localhost',
    user     : config.database.default.user,//'root',
    password : config.database.default.password,//'',
    port: config.database.default.port,//'3306',
    database: config.database.default.db_name,//'masterlab_dev',
});
connection.connect();
module.exports = connection;