let bunyan = require('bunyan')
const fs = require('fs')
const logDir = 'log'
const logPath = './log/result.log'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
    // fs.openSync(logPath, 'w')
}

var logger = bunyan.createLogger({
    name: 'scraperLogger',
    streams: [{
        type: 'rotating-file',
        path: logPath,
        period: '1d', // daily rotation
        count: 10 // keep 3 back copies
    }]
})

module.exports = logger
