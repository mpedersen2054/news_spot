let Outlet = require('../models').Outlet
let scrapers = require('./scrapers_load_obj')

// returns promise that creates db entry with info given
let createOutlet = info => {
    return new Promise((resolve, reject) => {
        Outlet.findOrCreate({ where: { name: info['name'] }, defaults: {
            name: info['name'],
            leaning: info['leaning'],
            website: info['website']
        }})
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

// turn scrapers{} into array, instantiate each of them
// and call createOutlet to turn it into a promise
Promise.all(Object.values(scrapers).map(s => createOutlet(new s())))
    .then(() => {
        console.log('\nSuccessfully added all News Outlets to Database.')
        process.exit()
    })
    .catch(err => console.log('There was an error.', err))
