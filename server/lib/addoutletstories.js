let Outlet = require('../models').Outlet,
    Story = require('../models').Story,
    scrapers = require('./scrapers_load_obj')

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
            .spread((story, created) => console.log(`Added new entry? : ${created}`))
            .then(() => resolve())
            .catch(err => {
                console.log(`Error adding story ${story['title']}`)
                reject(err)
            })
    })
}

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
                // call .then once all stories are added
                Promise.all(stories.map(story => addStory(story, results['id'])))
                    .then(() => resolve())
                    .catch(err => reject(err))
            })
        })
    })
}
