let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class CBSNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'latest_news', url: 'https://www.cbsnews.com/latest/rss/main', category: 'top' }
        ]
    }

    // override of Base, the thumbnail wasnt the same
    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = news['image']
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
