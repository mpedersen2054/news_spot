let scrapers = require('./scrapers_load_obj'),
    addOutletStories = require('./addoutletstories')

// let outlets = Object.values(scrapers).slice(0, 2)
let outlets = Object.values(scrapers).slice(0)
console.log(outlets)

Promise.all(Object.values(outlets).map(outlet => addOutletStories(new outlet())))
    .then(() => {
        console.log('Successfully added all stories.\n')
        process.exit()
    })
    .catch(err => {
        console.log('There was an error adding all stories.\n', err)
        process.exit()
    })
