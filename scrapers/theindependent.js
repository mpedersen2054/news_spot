let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class TheIndependent extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'uk_news', url: 'http://www.independent.co.uk/news/uk/rss', category: 'uk' },
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
            console.log(news)
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['media:content'] && news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
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
