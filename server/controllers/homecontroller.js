const secrets = require('../../secrets')

module.exports = {
    index(req, res) {
        res.send({
            env: process.env,
            host: secrets['db']['host'],
            username: secrets['db']['username'],
            password: secrets['db']['password'],
            port: secrets['db']['port'],
            name: secrets['db']['name']
        })
    },

    about(req, res) {
        res.send('Hello HomeCtrl.about!\n')
    }
}
