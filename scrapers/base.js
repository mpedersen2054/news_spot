
let axios = require('axios')
let parser = require('xml2json')

module.exports = class Scraper {

    init() {
        Promise.all(this.urls.map(this.fetch))
            .then((results) => {
                var formatted = results.map(this.format)
                console.log(formatted)
                this.data = formatted
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
