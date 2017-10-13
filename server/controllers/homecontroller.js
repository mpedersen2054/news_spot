let Outlet = require('../models').Outlet

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
        return Outlet
            .findAll()
            .then(outlets => {
                res.send(outlets)
            })
            .catch((err) => {
                console.log('THERE WAS ERR')
                console.log(err)
                res.send(err)
            })
    }
}
