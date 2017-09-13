let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class BostonGlobe extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'us_news', url: 'https://www.boston.com/tag/national-news/feed', category: 'us' },
            { title: 'world_news', url: 'https://www.boston.com/tag/world-news/feed', category: 'international' },
            { title: 'business_news', url: 'https://www.boston.com/tag/business/feed', category: 'economy' },
            { title: 'education_news', url: 'https://www.boston.com/tag/education/feed', category: 'education' },
            { title: 'finance_news', url: 'https://www.boston.com/tag/finance/feed', category: 'economy' },
            { title: 'health_news', url: 'https://www.boston.com/tag/health/feed', category: 'health' },
            { title: 'history_news', url: 'https://www.boston.com/tag/history/feed', category: 'misc' },
            { title: 'innovation_news', url: 'https://www.boston.com/tag/innovation/feed', category: 'science' },
            { title: 'jobs_news', url: 'https://www.boston.com/tag/jobs-news/feed', category: 'economy' },
            { title: 'politics_news', url: 'https://www.boston.com/tag/politics/feed', category: 'politics' },
            { title: 'science_news', url: 'https://www.boston.com/tag/science/feed', category: 'science' },
            { title: 'technology_news', url: 'https://www.boston.com/tag/technology/feed', category: 'technology' },
            { title: 'arts_news', url: 'https://www.boston.com/tag/arts/feed', category: 'entertainment' },
            { title: 'entertainment_news', url: 'https://www.boston.com/tag/entertainment/feed', category: 'entertainment' },
            { title: 'food_news', url: 'https://www.boston.com/tag/food/feed', category: 'entertainment' },
            { title: 'media_news', url: 'https://www.boston.com/tag/media/feed', category: 'misc' },
            { title: 'movies_news', url: 'https://www.boston.com/tag/movies/feed', category: 'entertainment' },
            { title: 'travel_news', url: 'https://www.boston.com/tag/travel/feed', category: 'travel' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = news['enclosure']['url']
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
