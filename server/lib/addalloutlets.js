let Outlet = require('../models').Outlet,
    scrapers = require('./scrapers_load_obj')

// returns promise that creates db entry with info given
const createOutlet = outletInfo => {
    return new Promise((resolve, reject) => {
        Outlet.findOrCreate({ where: { name: outletInfo['name'] }, defaults: {
            name: outletInfo['name'],
            leaning: outletInfo['leaning'],
            website: outletInfo['website']
        }})
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

// turn scrapers{} into array, instantiate each of them
// and call createOutlet to turn it into a promise
Promise.all(Object.values(scrapers).map(outlet => createOutlet(new outlet())))
    .then(() => {
        console.log('\nSuccessfully added all News Outlets to Database.')
        process.exit()
    })
    .catch(err => console.log('There was an error.', err))
