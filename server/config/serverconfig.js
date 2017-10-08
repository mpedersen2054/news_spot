const secrets = require('../../secrets')

module.exports = {
    development: {
        username : 'root',
        password : null,
        database : 'test_sequelize',
        host     : '127.0.0.1',
        port     : 3306,
        dialect  : 'mysql'
    },
    test: {
        username : 'root',
        password : null,
        database : 'test_sequelize',
        host     : '127.0.0.1',
        port     : 3306,
        dialect  : 'mysql'
    },
    // might want to move these to env variables
    // process.env.DB_USERNAME .....
    production: {
        username : secrets['db']['username'],
        password : secrets['db']['password'],
        database : secrets['db']['name'],
        host     : secrets['db']['host'],
        port     : secrets['db']['port'],
        dialect  : 'mysql'
    }
};
