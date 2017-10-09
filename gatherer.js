let scrapers         = require('./server/lib/scrapers_load_obj'),
    addOutletStories = require('./server/lib/addoutletstories'),
    mapSeries        = require('promise-map-series'),
    logger           = require('./server/lib/logger').scraperLogger

// const outlets = Object.values(scrapers).slice(0, 47)
const outlets = Object.values(scrapers).slice(0)

// will run addOutletStories SYNCRONOUSLY. need this
// because if running it asyncronously there will be way
// too many processes in use and it will throw error.
mapSeries(outlets, addOutletStories)
    .then((failures) => {
        failures = failures.filter(v => v !== 1) // remove all 1s
        if (failures.length > 0) {
            logger.log('warn', 'There were %j failures gathering all stories %j', failures.length, failures)
        } else {
            logger.log('info', 'There were no errors adding all stories for all outlets.')
        }
        // for some reason it wont create the log file if theres a process.exit() ???
        return 1
    })
    .then(success => {
        setTimeout(() => { process.exit() }, 5000)
    })
    .catch(err => {
        logger.log('warn', 'There was an error adding all stories %j', err)
        process.exit()
    })
