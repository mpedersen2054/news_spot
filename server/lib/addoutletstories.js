let Outlet    = require('../models').Outlet,
    Headline  = require('../models').Headline,
    Story     = require('../models').Story,
    mapSeries = require('promise-map-series')
    scrapers  = require('./scrapers_load_obj'),
    logger    = require('./logger').scraperLogger

// pass in an outlet and gather all stories for that outlet

const addStory = (story) => {
    return new Promise((resolve, reject) => {
        // findOrCreate based on story title & outletId
        return Story.findOrCreate({
            where: {
                title      : story['title'],
                outletId   : story['outletId']
            },
            defaults: {
                title       : story['title'],
                publishedAt : story['published_at'],
                thumbnail   : story['thumbnail'],
                description : story['description'],
                outletId    : story['outletId'],
                headlineId  : story['headlineId']
            }
        }).then(() => {
            // console.log(`OutletId: ${story['outletId']} | story: ${story['title']}`)
            resolve()
        }).catch(err => {
            // console.log(`Err adding story: ${story['title']}`)
            resolve()
        })
    })
}

// takes stories[] and returns { headlineName: [...], headlineName: [...] }
const seperateByHeadlineName = (stories) => {
    return stories.reduce((r, a) => {
        r[a.headline] = r[a.headline] || []
        r[a.headline].push(a)
        return r
    }, Object.create(null))
}

const addHeadlineId = (key, section) => {
    return new Promise((resolve, reject) => {
        const outletId = section[0]['outletId']
        // find the headlineId based on headlineName & outletId
        return Headline.findOne({
            where: { outletId: outletId, name: key },
            attributes: ['id']
        }).then(headline => {
            const headlineId = headline['dataValues']['id']
            // add the headlineId into each story
            const storyWithHeadlineId = section.map(story => {
                story['headlineId'] = headlineId
                return story
            })
            resolve(storyWithHeadlineId)
        }).catch(err => {
            console.log('There was an error in addHeadlineId', err)
            reject(err)
        })
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
                    const seperated = seperateByHeadlineName(storiesWithOutletId)
                    // add headlineId into all stories
                    Promise.all(Object.keys(seperated).map(key => addHeadlineId(key, seperated[key])))
                        .then(storiesWithHeadlineId => {
                            // turn [ [ { ...story },  ... ], [{ ..story }  ] ]
                            // into [ { ...story }, { ...story } ]
                            const storiesArr = storiesWithHeadlineId.reduce((a, b) => a.concat(b))
                            // make the array only have uniques, based on the title of story
                            // reduce having to make a few pointless queries into Story.findOrCreate
                            const uniqueStoriesArr = storiesArr.filter((item, pos, array) => {
                                return array.map(story => story['title']).indexOf(item['title']) === pos
                            })
                            // had to use map series, was getting too many processes err
                            mapSeries(uniqueStoriesArr, addStory)
                                .then(() => resolve(1)) // 1 for no failures
                                .catch(err => reject(err))
                        })
                        .catch(err => {
                            console.log('Error adding headlineId to stories', err)
                            reject(err)
                        })
                })
                .catch(errObj => {
                    errObj['id'] = results['id']
                    errObj['failDate'] = new Date()
                    resolve(errObj)
                })
        })
    })
}
