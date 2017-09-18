let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class EOnline extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'entertainment_news', url: 'http://syndication.eonline.com/syndication/feeds/rssfeeds/topstories.xml', category: 'entertainment' },
            { title: 'tv_news', url: 'http://syndication.eonline.com/syndication/feeds/rssfeeds/tvnews.xml', category: 'entertainment' },
            { title: 'style_news', url: 'http://syndication.eonline.com/syndication/feeds/rssfeeds/style.xml', category: 'entertainment' },
            { title: 'redcarpet_news', url: 'http://syndication.eonline.com/syndication/feeds/rssfeeds/redcarpet.xml', category: 'entertainment' },
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
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
