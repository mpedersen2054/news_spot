let scrapers = require('./server/lib/scrapers_load_obj'),
    addOutletStories = require('./server/lib/addoutletstories'),
    mapSeries = require('promise-map-series')

// let outlets = Object.values(scrapers).slice(0, 4)
let outlets = Object.values(scrapers).slice(0)

// will run addOutletStories SYNCRONOUSLY. need this
// because if running it asyncronously, there will be way
// too many threads/processes in use and it will throw errors.
mapSeries(outlets, addOutletStories)
    .then(() => {
        console.log('Successfully added all stories.\n')
        process.exit()
    })
    .catch(err => {
        console.log('There was an error adding all stories.\n', err)
        process.exit()
    })
