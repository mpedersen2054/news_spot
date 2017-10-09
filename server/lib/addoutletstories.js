let Outlet   = require('../models').Outlet,
    Story    = require('../models').Story,
    scrapers = require('./scrapers_load_obj'),
    logger   = require('./logger').scraperLogger

const addStory = (story, outletId) => {
    return new Promise((resolve, reject) => {
        // check to see if that story is already in DB
        // based on the title and its' outletId

        Story.findOrCreate({
            where: { title: story['title'], outletId },
            defaults: {
                // add all props if no story found
                title       : story['title'],
                publishedAt : story['published_at'],
                thumbnail   : story['thumbnail'],
                description : story['description'],
                category    : story['category'],
                headline    : story['headline'],
                outletId    : outletId
            }
        })
            // .spread((story, created) => console.log(`Added new entry? : ${created}`))
            .then(() => resolve())
            .catch(err => {
                // console.log(`Error adding story ${story['title']}`)
                console.dir(story)
                reject(err)
            })
    })
}

module.exports = outlet => {
    outlet = new outlet()
    return new Promise((resolve, reject) => {
        // get the outlet id to check in story findOrCreate
        // console.log(outlet.name)
        Outlet.findOne({
            where: { name: outlet.name },
            attributes: ['id'],
            raw: true
        }).then(results => {
            // console.log(`Adding stories for Outlet #${results.id}`)
            // results: { id: X }
            outlet.init()
                .then(stories => {
                    // stores: [ {...}, {...}, ... ]
                    // call .then once all stories are added
                    Promise.all(stories.map(story => addStory(story, results['id'])))
                        .then(() => resolve(1)) // 0 for no failures
                        .catch(err => reject(err))
                })
                .catch(errObj => {
                    errObj['id'] = results['id']
                    errObj['failDate'] = new Date()
                    // console.log(`Error in addoutletstories for ${outlet.name}`, errObj)
                    resolve(errObj)
                })
        })
    })
}
