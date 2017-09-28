let Scraper = require('./base')

module.exports = class FoxNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Fox News'
        this.leaning = 'r'
        this.website = 'http://www.foxnews.com/'
        this.urls = [
            // for some reason top_news isnt loading?
            // { title: 'top_news', url: 'http://feeds.foxnews.com/foxnews/most-popular', category: 'top' },
            { title: 'entertainment_news', url: 'http://feeds.foxnews.com/foxnews/entertainment', category: 'entertainment' },
            { title: 'health_news', url: 'http://feeds.foxnews.com/foxnews/health', category: 'health' },
            { title: 'lifestyle_news', url: 'http://feeds.foxnews.com/foxnews/section/lifestyle', category: 'health' },
            { title: 'opinion_news', url: 'http://feeds.foxnews.com/foxnews/opinion', category: 'misc' },
            { title: 'politics_news', url: 'http://feeds.foxnews.com/foxnews/politics', category: 'politics' },
            { title: 'science_news', url: 'http://feeds.foxnews.com/foxnews/science', category: 'science' },
            { title: 'sports_news', url: 'http://feeds.foxnews.com/foxnews/sports', category: 'sports' },
            { title: 'technology_news', url: 'http://feeds.foxnews.com/foxnews/tech', category: 'technology' },
            { title: 'travel_news', url: 'http://feeds.foxnews.com/foxnews/internal/travel/mixed', category: 'travel' },
            { title: 'us_news', url: 'http://feeds.foxnews.com/foxnews/national', category: 'us' },
            { title: 'world_news', url: 'http://feeds.foxnews.com/foxnews/world', category: 'international' },
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
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            // not all articles have an image
            if (news['media:thumbnail'] && news['media:thumbnail']['url']) {
                newsObj.thumbnail = news['media:thumbnail']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // LATER STRIP HTML FROM DESCRIPTION!
            newsObj.description = news['description']
            newsObj.category = obj.category
            newsObj.headline = obj.title
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
