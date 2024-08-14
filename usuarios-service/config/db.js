const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mysql-container',
    user: 'root',
    password: 'password',
    database: 'soa_p',  // Esquema que defines en tu script
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
