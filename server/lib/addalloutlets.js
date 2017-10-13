let Outlet    = require('../models').Outlet,
    Headline  = require('../models').Headline,
    scrapers  = require('./scrapers_load_obj'),
    mapSeries = require('promise-map-series')

var outletCount = 0

// returns promise that creates db entry with info given
const createOutlet = outlet => {
    outlet = new outlet()
    return new Promise((resolve, reject) => {
        Outlet.findOrCreate({ where: { name: outlet['name'] }, defaults: {
            name: outlet['name'],
            leaning: outlet['leaning'],
            website: outlet['website']
        }})
            .then(results => {
                const outletId = results[0]['dataValues']['id']
                outletCount += outlet['urls'].length
                Promise.all(outlet['urls'].map(headline => createHeadline(headline, outletId)))
                    .then(() => {
                        console.log(`Successfully added headlines for ${outlet['name']}`)
                        resolve()
                    })
                    .catch(err => {
                        console.log(`Error adding headlines for ${outlet['name']}`)
                        reject(err)
                    })
            })
            .catch(err => reject(err))
    })
}

const createHeadline = (headline, outletId) => {
    return new Promise((resolve, reject) => {
        Headline.findOrCreate({ where: { name: headline['title'], outletId: outletId }, defaults: {
            name: headline['title'],
            url: headline['url'],
            category: headline['category'],
            outletId
        }})
            .then(() => resolve())
            .catch(err => reject(err))
    })
}

// turn scrapers{} into array, instantiate each of them
// and call createOutlet to turn it into a promise, SYNCRONOUSLY
const outlets = Object.values(scrapers).slice(0)
mapSeries(outlets, createOutlet)
    .then(() => {
        console.log('\nSuccessfully added all News Outlets to Database.')
        console.log(`outlet #: ${outletCount}`)
        process.exit()
    })
    .catch(err => console.log('There was an error.', err))
