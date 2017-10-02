let scrapers = require('./scrapers_load_obj'),
    addOutletStories = require('./addoutletstories')

let sample = Object.values(scrapers).slice(0, 2)

Promise.all(Object.values(sample).map(outlet => addOutletStories(new outlet())))
    .then(() => {
        console.log('hi from main.js\n\n')
        process.exit()
    })
    .catch(err => {
        console.log('There was an error.')
        console.log(err)
        process.exit()
    })
