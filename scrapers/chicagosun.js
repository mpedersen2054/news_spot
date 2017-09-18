let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ChicagoSun extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://www.thesuntimes.com/news?template=rss&mime=xml', category: 'top' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
