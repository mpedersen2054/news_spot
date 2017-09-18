let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ChristianScience extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://rss.csmonitor.com/feeds/csm', category: 'top' },
            { title: 'arts_news', url: 'http://rss.csmonitor.com/feeds/arts', category: 'entertainment' },
            { title: 'books_news', url: 'http://rss.csmonitor.com/feeds/books', category: 'entertainment' },
            { title: 'commentary_news', url: 'http://rss.csmonitor.com/feeds/commentary', category: 'misc' },
            { title: 'dcdecoder_news', url: 'http://rss.csmonitor.com/feeds/dcdecoder', category: 'politics' },
            { title: 'environment_news', url: 'http://rss.csmonitor.com/feeds/environment', category: 'science' },
            { title: 'innovation_news', url: 'http://rss.csmonitor.com/feeds/scitech', category: 'science' },
            { title: 'living_news', url: 'http://rss.csmonitor.com/feeds/living', category: 'health' },
            { title: 'business_news', url: 'http://rss.csmonitor.com/feeds/wam', category: 'economy' },
            { title: 'politics_news', url: 'http://rss.csmonitor.com/feeds/politics', category: 'politics' },
            { title: 'science_news', url: 'http://rss.csmonitor.com/feeds/science', category: 'science' },
            { title: 'culture_news', url: 'http://rss.csmonitor.com/feeds/theculture', category: 'misc' },
            { title: 'us_news', url: 'http://rss.csmonitor.com/feeds/usa', category: 'us' },
            { title: 'world_news', url: 'http://rss.csmonitor.com/feeds/world', category: 'international' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js['rdf:RDF']['item']
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date()
            newsObj.thumbnail = 'Not provided.'
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
