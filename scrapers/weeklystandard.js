let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class WeeklyStandard extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'obama_news', url: 'http://www.weeklystandard.com/rss/Obama/rss.xml', category: 'politics' },
            { title: 'healthcare_news', url: 'http://www.weeklystandard.com/rss/Healthcare/rss.xml', category: 'politics' },
            { title: 'media_news', url: 'http://www.weeklystandard.com/rss/Media/rss.xml', category: 'politics' },
            { title: 'iraq_news', url: 'http://www.weeklystandard.com/rss/Iraq/rss.xml', category: 'me' },
            { title: 'iran_news', url: 'http://www.weeklystandard.com/rss/Iran/rss.xml', category: 'me' },
            { title: 'afganistan_news', url: 'http://www.weeklystandard.com/rss/Afghanistan/rss.xml', category: 'me' },
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
            // there is no pub date for some reason
            newsObj.published_at = new Date(news['pubDate'])
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // need to remove html from description
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
