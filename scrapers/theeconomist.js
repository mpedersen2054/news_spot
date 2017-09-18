let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class TheEconomist extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'business_news', url: 'http://www.economist.com/sections/business-finance/rss.xml', category: 'economy' },
            // { title: '', url: '', category: '' },
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
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            // not all articles have an image
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            // LATER STRIP HTML FROM DESCRIPTION!
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
