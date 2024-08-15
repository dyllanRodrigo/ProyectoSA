const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mysql-container',
    user: 'root',
    password: 'password',
    database: 'soa_p',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
