let scrapers         = require('./scrapers_load_obj'),
    addOutletStories = require('./addoutletstories'),
    mapSeries        = require('promise-map-series')

// this file takes all outlets, passes each into addOutletStories
// which adds all stories for each outlet. This file will add ALL
// stories for ALL outlets

const outlets = Object.values(scrapers).slice(0)

// will run addOutletStories SYNCRONOUSLY. if not sync
// it will possibly add them out of alpha order
module.exports = () => {
    return new Promise((resolve, reject) => {
        mapSeries(outlets, addOutletStories)
            .then((failures) => {
                failures = failures.filter(v => v !== 1) // remove all 1s
                resolve(failures)
            })
            .catch(err => {
                reject(err)
            })
    })
}
