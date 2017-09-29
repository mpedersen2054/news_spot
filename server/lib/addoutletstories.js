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
        }).then(results => { // { id: X }
            console.log('the id: ', results.id)
            outlet.init().then(stories => {
                stories.forEach(story => {
                    console.log('HI IM A STORY!!')
                    console.log(story)
                })
            })
        })
        // console.log(name, leaning, website)
    })
}
