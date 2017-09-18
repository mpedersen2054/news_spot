let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class CBSNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'latest_news', url: 'https://www.cbsnews.com/latest/rss/main', category: 'top' },
            { title: 'us_news', url: 'https://www.cbsnews.com/latest/rss/us', category: 'us' },
            { title: 'politics_news', url: 'https://www.cbsnews.com/latest/rss/politics', category: 'politics' },
            { title: 'international_news', url: 'https://www.cbsnews.com/latest/rss/world', category: 'international' },
            { title: 'technology_news', url: 'https://www.cbsnews.com/latest/rss/tech', category: 'technology' },
            { title: 'health_news', url: 'https://www.cbsnews.com/latest/rss/health', category: 'health' },
            { title: 'entertainment_news', url: 'https://www.cbsnews.com/latest/rss/entertainment', category: 'entertainment' },
            { title: 'economy_news', url: 'https://www.cbsnews.com/latest/rss/moneywatch', category: 'economy' },
            { title: 'evening_news', url: 'https://www.cbsnews.com/latest/rss/evening-news-cbs-news-investigates', category: 'misc' },
            { title: 'opinion_news', url: 'https://www.cbsnews.com/latest/rss/opinion', category: 'misc' },
            { title: 'morning_news', url: 'https://www.cbsnews.com/latest/rss/cbs-this-morning', category: 'misc' },
            { title: '48_hours_news', url: 'https://www.cbsnews.com/latest/rss/48-hours', category: 'misc' },
            { title: '60_minutes_news', url: 'https://www.cbsnews.com/latest/rss/60-minutes', category: 'misc' },
            { title: 'face_the_nation_news', url: 'https://www.cbsnews.com/latest/rss/face-the-nation', category: 'politics' },
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