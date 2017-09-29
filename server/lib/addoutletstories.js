let Outlet = require('../models').Outlet,
    Story = require('../models').Story,
    scrapers = require('./scrapers_load_obj')

module.exports = outlet => {
    return new Promise((resolve, reject) => {
        // get the outlet id to check in story findOrCreate
        Outlet.findOne({
            where: { name: outlet.name },
            attributes: ['id'],
            raw: true
        }).then(results => {
            // results: { id: X }
            outlet.init().then(stories => {
                // stores: [ {...}, {...}, ... ]
                stories.forEach(story => {
                    // story: {...}
                    // find or create based on the stories name and its outletId
                    Story.findOrCreate({
                        where: { title: story['title'], outletId: results['id'] },
                        defaults: {
                            // add all props if no story found
                        }
                    })
                })
            })
        })
        // console.log(name, leaning, website)
    })
}
