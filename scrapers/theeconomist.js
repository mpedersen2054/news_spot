let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class TheEconomist extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'business_news', url: 'http://www.economist.com/sections/business-finance/rss.xml', category: 'economy' },
            { title: 'economy_news', url: 'http://www.economist.com/sections/economics/rss.xml', category: 'economy' },
            { title: 'science_news', url: 'http://www.economist.com/sections/science-technology/rss.xml', category: 'science' },
            { title: 'culture_news', url: 'http://www.economist.com/sections/culture/rss.xml', category: 'misc' },
            { title: 'us_news', url: 'http://www.economist.com/sections/united-states/rss.xml', category: 'us' },
            { title: 'uk_news', url: 'http://www.economist.com/sections/britain/rss.xml', category: 'uk' },
            { title: 'china_news', url: 'http://www.economist.com/sections/china/rss.xml', category: 'cn' },
            { title: 'america_news', url: 'http://www.economist.com/sections/americas/rss.xml', category: 'us' },
            { title: 'middleeast_news', url: 'http://www.economist.com/sections/middle-east-africa/rss.xml', category: 'me' },
            { title: 'obituary_news', url: 'http://www.economist.com/sections/obituary/rss.xml', category: 'misc' },
            { title: 'leaders_news', url: 'http://www.economist.com/sections/leaders/rss.xml', category: 'misc' },
            { title: 'international_news', url: 'http://www.economist.com/sections/international/rss.xml', category: 'international' },
            { title: 'eu_news', url: 'http://www.economist.com/sections/europe/rss.xml', category: 'eu' },
            { title: 'asia_news', url: 'http://www.economist.com/sections/asia/rss.xml', category: 'cn' },
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