let Outlet = require('../models').Outlet,
    scrapers = require('./scrapers_load_obj'),
    mapSeries = require('promise-map-series') // sometimes it adds them in non alpha order so using this

// returns promise that creates db entry with info given
const createOutlet = outlet => {
    outlet = new outlet()
    return new Promise((resolve, reject) => {
        Outlet.findOrCreate({ where: { name: outlet['name'] }, defaults: {
            name: outlet['name'],
            leaning: outlet['leaning'],
            website: outlet['website']
        }})
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

// turn scrapers{} into array, instantiate each of them
// and call createOutlet to turn it into a promise
const outlets = Object.values(scrapers).slice(0)
mapSeries(outlets, createOutlet)
    .then(() => {
        console.log('\nSuccessfully added all News Outlets to Database.')
        process.exit()
    })
    .catch(err => console.log('There was an error.', err))
