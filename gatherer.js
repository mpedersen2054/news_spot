let addAllStories = require('./server/lib/addallstories'),
    logger        = require('./server/lib/logger').scraperLogger,
    CronJob       = require('cron').CronJob,
    ARGS          = process.argv.slice(2)

// Adds all stories, passing 'once' when running program
// to add only once, otherwise it will try to add stories everyday at 2:00pm

const addAll = () => {
    const start = new Date
    addAllStories()
        .then(failures => {
            if (failures.length > 0) {
                logger.log('warn', 'There were %j failures gathering all stories %j', failures.length, failures)
            } else {
                logger.log('info', 'There were no errors adding all stories for all outlets.')
            }
            logger.log('info', 'It took %j seconds to add all stories.', (new Date - start) / 1000)
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

// check weather arg 'once' was passed in, if it was, only addAll() 1 time
if (ARGS.length > 0 && ARGS[0] == 'once') {
    logger.log('info', 'Add stories once.')
    addAll()
} else {
    // will call addAll() at 2pm everyday
    try {
        new CronJob('00 00 14 * * 0-6', () => {
            addAll()
        }, null, true, 'America/New_York')
    } catch(ex) {
        logger.log('warn', 'the pattern was not valid! %j', ex)
    }
}
