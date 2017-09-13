let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class BostonGlobe extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'us_news', url: 'https://www.boston.com/tag/national-news/?feed=rss', category: 'us' }
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            console.log(news)
            // newsObj.title = news['title']
            // newsObj.published_at = new Date(news['pubDate'])
            // newsObj.thumbnail = news['media:thumbnail']['url']
            // newsObj.url = news['link']
            // newsObj.description = news['description']
            // newsObj.category = obj.category
            // // push the formatted data into newData[]
            // newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
