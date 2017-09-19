let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class USNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'world_news', url: 'https://www.usnews.com/rss/news', category: 'international' },
            { title: 'travel_news', url: 'https://www.usnews.com/rss/travel-editorial', category: 'travel' },
            { title: 'opinion_news', url: 'https://www.usnews.com/rss/opinion', category: 'misc' },
            { title: 'money_news', url: 'https://www.usnews.com/rss/money', category: 'economy' },
            { title: 'health_news', url: 'https://www.usnews.com/rss/health', category: 'health' },
            { title: 'education_news', url: 'https://www.usnews.com/rss/education', category: 'education' },
            { title: 'science_news', url: 'https://www.usnews.com/topics/subjects/science/rss', category: 'science' },
            { title: 'us_news', url: 'https://www.usnews.com/rss/the-report', category: 'us' },
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
