const secrets = require('../../secrets')

module.exports = {
    index(req, res) {
        res.send({
            env: process.env.NODE_ENV,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
            name: process.env.DB_NAME
        })
    },

    about(req, res) {
        res.send('Hello HomeCtrl.about!\n')
    }
}
