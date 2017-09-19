let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class RadarOnline extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'celebrity_news', url: 'http://radaronline.com/feed/', category: 'entertainment' },
        ]
    }

    // EU ONLY HAD 1 ITEM, SOMEHOW THIS MESSED UP GIVING
    // TypeError: data[Symbol.iterator] is not a function error

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            var newsObj = {}
            console.log(news)
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            // need to remove html from the description
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}