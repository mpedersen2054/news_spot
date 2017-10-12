const winston = require('winston')
const fs      = require('fs')
const logDir  = './log'
const env     = process.env.NODE_ENV || 'development'

// add rotation functionality onto winston.transports
require('winston-daily-rotate-file')

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const tsFormat = () => (new Date()).toLocaleTimeString()

const logfileTransport = new (winston.transports.DailyRotateFile)({
    filename    : `${logDir}/-results.log`,
    datePattern : 'yyyy-MM-dd',
    prepend     : true,
    level       : process.env.ENV === 'development' ? 'debug' : 'info',
    prettyPrint : object => JSON.stringify(object)
})

exports.scraperLogger = new(winston.Logger)({
    transports: [
        logfileTransport,
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'info'
        })
    ]
})
