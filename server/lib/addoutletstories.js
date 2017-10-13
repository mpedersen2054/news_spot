let Outlet   = require('../models').Outlet,
    Headline = require('../models').Headline,
    Story    = require('../models').Story,
    scrapers = require('./scrapers_load_obj'),
    logger   = require('./logger').scraperLogger

// pass in an outlet and gather all stories for that outlet

const addStory = (story, outletId) => {
    return new Promise((resolve, reject) => {
        // get the headlineId
        Headline.findOne({
            where: { outletId: outletId, name: story['headline'] },
            attributes: ['id']
        }).then(headline => {
            const headlineId = headline['dataValues']['id']
            // check to see if that story is already in DB
            // based on the title and its' outletId
            Story.findOrCreate({
                where: { title: story['title'], outletId },
                // add all props if no story found
                defaults: {
                    title       : story['title'],
                    publishedAt : story['published_at'],
                    thumbnail   : story['thumbnail'],
                    description : story['description'],
                    headlineId,
                    outletId
                }
            })
                .then(() => resolve())
                .catch(err => reject(err))
        }).catch(err => console.log('There was an error finding the headline for story.'))
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
                    // might want to switch this to mapSeries if there are too many processes
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
