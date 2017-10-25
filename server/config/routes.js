let homeCtrl = require('../controllers/homecontroller'),
    outletCtrl = require('../controllers/outletcontroller'),
    headlineCtrl = require('../controllers/headlinecontroller'),
    storiesCtrl = require('../controllers/storycontroller')

module.exports = (app) => {
    // api endpoints
    app.get('/api/v1/outlets', outletCtrl.index)
    app.get('/api/v1/outlets/:id', outletCtrl.show)

    app.get('/api/v1/stories', storiesCtrl.index)

}
