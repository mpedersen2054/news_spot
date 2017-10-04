
let logger = require('./server/lib/logger')

const url = 'something.com/api'
logger.error('some error', 'hey there', 'another thing')
logger.info({
    s1: true,
    s2: true,
    s3: true,
    s4: {
        text: 'hello world',
        success: false
    }
}, 'faulty outlet requests')
