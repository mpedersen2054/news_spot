let Outlet = require('../models').Outlet,
    Story = require('../models').Story,
    scrapers = require('./scrapers_load_obj')

module.exports = outlet => {
    return new Promise((resolve, reject) => {
        let { name, leaning, website } = outlet

        outlet.init().then(stories => {
            console.log('hi from addoutletstories!')
            // console.log(name, leaning, website)
            console.log(stories)
        })
        // console.log(name, leaning, website)
    })
}
