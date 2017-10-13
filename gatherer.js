let addAllStories = require('./server/lib/addallstories'),
    logger        = require('./server/lib/logger').scraperLogger,
    CronJob       = require('cron').CronJob

const addAll = () => {
    const start = new Date
    addAllStories()
        .then(failures => {
            logger.log('info', 'It took %j seconds to add all stories.', (new Date - start) / 1000)
            if (failures.length > 0) {
                logger.log('warn', 'There were %j failures gathering all stories %j', failures.length, failures)
            } else {
                logger.log('info', 'There were no errors adding all stories for all outlets.')
            }
            // winston needs time to log it to a file, so need a timeout
            setTimeout(() => {
                process.exit()
            }, 5000)
        })
        .catch(err => {
            logger.log('warn', 'There was an error adding all stories %j', err)
            process.exit()
        })
}

// addAll()
logger.log('info', 'STARTED GATHERER.JS @ %j', new Date().toLocaleTimeString())

// will call addAll() at 10:15am and 6:15pm eastern time
try {
    new CronJob('00 15 10,18 * * 0-6', () => {
        addAll()
    }, null, true, 'America/New_York')
} catch(ex) {
    logger.log('warn', 'the pattern was not valid! %j', ex)
}
