let Scraper = require('./base')

module.exports = class DailyCaller extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Daily Caller'
        this.leaning = 'r'
        this.website = 'http://dailycaller.com/'
        this.urls = [
            { title: 'top_news', url: 'http://feeds.feedburner.com/dailycaller', category: 'top' },
            { title: 'politics_news', url: 'http://feeds.feedburner.com/dailycaller-politics', category: 'politics' },
            { title: 'us_news', url: 'http://feeds.feedburner.com/dailycaller-us', category: 'us' },
            { title: 'entertainment_news', url: 'http://feeds.feedburner.com/dailycaller-entertainment', category: 'entertainment' },
            { title: 'world_news', url: 'http://feeds.feedburner.com/dailycaller-world', category: 'international' },
            { title: 'sports_news', url: 'http://feeds.feedburner.com/dailycaller-sports', category: 'sports' },
            { title: 'business_news', url: 'http://feeds.feedburner.com/dailycaller-business', category: 'economy' },
            { title: 'technology_news', url: 'http://feeds.feedburner.com/dailycaller-tech', category: 'technology' },
            { title: 'opinion_news', url: 'http://feeds.feedburner.com/dailycaller-opinion', category: 'misc' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return []
        }
        for (var news of data) {
            // console.log(news)
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            newsObj.headline = obj.title
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
