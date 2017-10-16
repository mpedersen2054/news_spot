let homeCtrl = require('../controllers/homecontroller'),
    outletCtrl = require('../controllers/outletcontroller'),
    headlineCtrl = require('../controllers/headlinecontroller'),
    storiesCtrl = require('../controllers/storycontroller')

module.exports = (app) => {

    // api endpoints
    app.get('/api/v1/outlets', outletCtrl.index)
    app.get('/api/v1/outlets/:id', outletCtrl.show)

    app.get('/about', homeCtrl.about)
    app.get('/', homeCtrl.index)

    app.get('*', (req, res) => res.status(404).send(`Cannot find a route for ${req.url}`))
}
