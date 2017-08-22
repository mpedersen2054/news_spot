let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ABCNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_stories', url: 'http://abcnews.go.com/abcnews/topstories' },
            { title: 'international_headlines', url: 'http://abcnews.go.com/abcnews/internationalheadlines' }
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.thumbnail = news['media:thumbnail'][3]
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = news['category']
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, stories: newData })
    }

}
