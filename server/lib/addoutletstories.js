let Outlet    = require('../models').Outlet,
    Headline  = require('../models').Headline,
    Story     = require('../models').Story,
    mapSeries = require('promise-map-series')
    scrapers  = require('./scrapers_load_obj'),
    logger    = require('./logger').scraperLogger

// pass in an outlet and gather all stories for that outlet

const addStory = (story) => {
    return new Promise((resolve, reject) => {
        // get the headlineId
        Headline.findOne({
            where: { outletId: story['outletId'], name: story['headline'] },
            attributes: ['id']
        }).then(headline => {
            const headlineId = headline['dataValues']['id']
            // findOrCreate based on story title & outletId
            return Story.findOrCreate({
                where: { title: story['title'], outletId: story['outletId'] },
                defaults: {
                    title       : story['title'],
                    publishedAt : story['published_at'],
                    thumbnail   : story['thumbnail'],
                    description : story['description'],
                    outletId    : story['outletId'],
                    headlineId
                }
            })
                .then(() => resolve())
                .catch(err => resolve())
        }).catch(err => console.log('There was an error finding the headline for story.', err))
    })
}

module.exports = outlet => {
    outlet = new outlet()
    return new Promise((resolve, reject) => {
        // get the outletId
        Outlet.findOne({
            where: { name: outlet.name },
            attributes: ['id'],
            raw: true
        }).then(results => {
            // results: { id: X }
            outlet.init()
                .then(stories => {
                    // connect the outletId onto the storyObj
                    const storiesWithOutletId = stories.map(story => {
                        story['outletId'] = results['id']
                        return story
                    })
                    // had to use map series, was getting too many processes err
                    mapSeries(storiesWithOutletId, addStory)
                        .then(() => resolve(1)) // 0 for no failures
                        .catch(err => reject(err))
                })
                .catch(errObj => {
                    errObj['id'] = results['id']
                    errObj['failDate'] = new Date()
                    resolve(errObj)
                })
        })
    })
}
