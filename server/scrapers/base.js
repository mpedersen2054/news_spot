let parser = require('xml2json')
let axios = require('axios')
let sanitizer = require('sanitize-html')

module.exports = class Scraper {
    // waits until all fetch calls are finished before
    // using the callback, will return [] of all results
    init() {
        return new Promise((resolve, reject) => {
            Promise.all(this.urls.map(this.fetch))
                .then(results => results.map(this.format))
                .then(formatted => formatted.reduce((a, b) => a.concat(b)))
                .then(flattened => {
                    resolve(flattened)
                })
                .catch((err) => {
                    console.log('there was in error!', err)
                    reject(err)
                })
        })
    }

    fetch(item) {
        return new Promise((resolve, reject) => {
            axios.get(item.url)
                .then(response => parser.toJson(response.data.trim()))
                .then(parsed => {
                    resolve({
                        title: item.title,
                        category: item.category,
                        data: parsed
                    })
                })
                .catch(err => {
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
