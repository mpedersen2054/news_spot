const homeCtrl = require('../controllers/homecontroller')

module.exports = (app) => {
    app.get('/about', homeCtrl.about)
    app.get('/', homeCtrl.index)
}
