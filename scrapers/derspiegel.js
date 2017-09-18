let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class DerSpiegel extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://www.spiegel.de/international/index.rss', category: 'top' },
            { title: 'eu_news', url: 'http://www.spiegel.de/international/europe/index.rss', category: 'eu' },
            // { title: 'eu_news', url: '', category: '' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            console.log(news)
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            // not all articles have an image
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
