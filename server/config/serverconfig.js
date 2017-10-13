
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
        username : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_NAME,
        host     : process.env.DB_HOST,
        port     : process.env.DB_PORT,
        dialect  : 'mysql'
    }
};
