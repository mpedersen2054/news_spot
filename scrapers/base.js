
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
                    // console.log(response.data)
                    let parsed = parser.toJson(response.data)
                    // console.log(parsed)
                    let objWTitle = { title: item.title, category: item.category, data: parsed }
                    resolve(objWTitle)
                })
                .catch((err) => {
                    console.log('there was an error!')
                    console.log(err)
                    reject(err)
                })
        })
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = news['media:thumbnail'][3]
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
