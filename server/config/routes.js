let homeCtrl = require('../controllers/homecontroller'),
    outletCtrl = require('../controllers/outletcontroller'),
    headlineCtrl = require('../controllers/headlinecontroller')
    storiesCtrl = require('../controllers/storycontroller')

module.exports = (app) => {


    app.get('/api/outlets', outletCtrl.index)
    app.get('/api/outlets/:id', outletCtrl.show)

    app.get('/about', homeCtrl.about)
    app.get('/', homeCtrl.index)
}
