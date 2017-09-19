let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class DailyMail extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://www.dailymail.co.uk/news/index.rss', category: 'top' },
            { title: 'us_news', url: 'http://www.dailymail.co.uk/ushome/index.rss', category: 'us' },
            { title: 'sports_news', url: 'http://www.dailymail.co.uk/sport/index.rss', category: 'sports' },
            { title: 'showbiz_news', url: 'http://www.dailymail.co.uk/tvshowbiz/index.rss', category: 'entertainment' },
            { title: 'health_news', url: 'http://www.dailymail.co.uk/health/index.rss', category: 'health' },
            { title: 'sciencetech_news', url: 'http://www.dailymail.co.uk/sciencetech/index.rss', category: 'science' },
            { title: 'money_news', url: 'http://www.dailymail.co.uk/money/index.rss', category: 'economy' },
            { title: 'travel_news', url: 'http://www.dailymail.co.uk/travel/index.rss', category: 'travel' },
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
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
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