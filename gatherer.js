let addAllStories = require('./server/lib/addallstories'),
    logger        = require('./server/lib/logger').scraperLogger,
    CronJob       = require('cron').CronJob

const addAll = () => {
    addAllStories()
        .then(failures => {
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

addAll()

// // will call addAll() at 10:15am and 6:15pm eastern time
// try {
//     new CronJob('00 15 10,18 * * 0-6', () => {
//         console.log(`scraping drudgereport.com @ ${new Date().toLocaleTimeString()}`)
//         addAll()
//     }, null, true, 'America/New_York')
// } catch(ex) {
//     console.log('the pattern was not valid!', ex)
// }
