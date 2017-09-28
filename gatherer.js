
let scrapers = require('./scrapers_load_obj')

new scrapers['ABCNews']().init().then(results => {
    console.log(results)
})
