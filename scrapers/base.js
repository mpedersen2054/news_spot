
let axios = require('axios')
let parser = require('xml2json')

module.exports = class Scraper {
    // waits until all fetch calls are finished before
    // using the callback, will return [] of all results
    init(callback) {
        Promise.all(this.urls.map(this.fetch))
            .then((results) => {
                this.data = results.map(this.format)
                callback(this)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    fetch(item) {
        return new Promise((resolve, reject) => {
            axios.get(item.url)
                .then((response) => {
                    let parsed = parser.toJson(response.data)
                    let objWTitle = { title: item.title, data: parsed }
                    resolve(objWTitle)
                })
                .catch((err) => {
                    console.log('there was an error!')
                    reject(err)
                })
        })
    }

}
