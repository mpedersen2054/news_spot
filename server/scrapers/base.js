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
                    // for ERRNET error, there will be no status
                    let status
                    if (err.response.status) {
                        status = err.response.status
                    } else {
                        status = 'No status provided.'
                    }
                    const errObj = {
                        name: this.name,
                        error: err.message,
                        status
                    }
                    console.log(`Error in Base.init for ${this.name}`)
                    reject(errObj)
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
                    // console.log(err.response.status)
                    // reject({ url: item.url, status: err.response.status })
                    console.log(`Error in Base.fetch for ${item.url}`)
                    reject(err)
                })
        })
    }

    // to be used in newsObj.description to shorten it & remove html
    sanitizeHtml(html) {
        let opts = { allowedTags: [], allowedAttributes: [] },
            sliceLen

        if (html && html.length) {
            sliceLen = (html.length > 499) ? 500 : html.length
        } else {
            // handle if there isnt even a description
            html = 'No description provided.'
            sliceLen = (html.length > 499) ? 500 : html.length
        }
        // remove all \n and \r and only allow the first 501 chars
        let clean = sanitizer(html, opts)
            .replace(/[\r\n]+/g, '')
            .slice(0, sliceLen)
        // returns so it isnt ending in middle of sentence, goes towards the front of string
        return clean.slice(0, clean.lastIndexOf('.') + 1)
    }
}
