const secrets = require('../../secrets')

module.exports = {
    index(req, res) {
        res.send(secrets)
    },

    about(req, res) {
        res.send('Hello HomeCtrl.about!\n')
    }
}
