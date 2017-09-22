let parser = require('xml2json')
let axios = require('axios')
let sanitizer = require('sanitize-html')

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
                console.log('there was in error!', err)
                // callback(err)
            })
    }

    fetch(item) {
        return new Promise((resolve, reject) => {
            axios.get(item.url)
                .then((response) => {
                    // added trim, got an xml file with blank line at top
                    let parsed = parser.toJson(response.data.trim())
                    // console.log(parsed)
                    let objWTitle = { title: item.title, category: item.category, data: parsed }
                    resolve(objWTitle)
                })
                .catch((err) => {
                    console.log('there was an error!', err)
                    reject(err)
                })
        })
    }

    // to be used in newsObj.description to shorten it & remove html
    sanitizeHtml(html) {
        let opts = { allowedTags: [], allowedAttributes: [] }
        // remove all \n and \r and only allow the first 501 chars
        let clean = sanitizer(html, opts)
            .replace(/[\r\n]+/g, '')
            .slice(0, 500)
        // returns so it isnt ending in middle of sentence, goes towards the front of string
        return clean.slice(0, clean.lastIndexOf('.') + 1)
    }
}
