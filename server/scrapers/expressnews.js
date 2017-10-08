let Scraper = require('./base')

module.exports = class ExpressNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'San Antonio Express News'
        this.leaning = 'i'
        this.website = 'http://www.expressnews.com/'
        this.urls = [
            { title: 'travel_news', url: 'http://feeds.feedburner.com/daily-express-travel', category: 'travel' },
            { title: 'finance_news', url: 'http://feeds.feedburner.com/daily-express-finance-news', category: 'economy' },
            { title: 'entertainment_news', url: 'http://feeds.feedburner.com/daily-express-entertainment-news', category: 'entertainment' },
            { title: 'gaming_news', url: 'http://feeds.feedburner.com/daily-express-gaming', category: 'entertainment' },
            { title: 'music_news', url: 'http://feeds.feedburner.com/daily-express-music-news', category: 'music' },
            { title: 'style_news', url: 'http://feeds.feedburner.com/daily-express-life-and-style-health-news', category: 'entertainment' },
            { title: 'technology_news', url: 'http://feeds.feedburner.com/daily-express-tech', category: 'technology' },
            { title: 'uk_news', url: 'http://feeds.feedburner.com/daily-express-uk-news', category: 'uk' },
            { title: 'world_news', url: 'http://feeds.feedburner.com/daily-express-world-news', category: 'international' },
            { title: 'politics_news', url: 'http://feeds.feedburner.com/daily-express-politics', category: 'politics' },
            { title: 'nature_news', url: 'http://feeds.feedburner.com/daily-express-nature', category: 'environment' },
            { title: 'weather_news', url: 'http://feeds.feedburner.com/daily-express-weather', category: 'environment' },
            { title: 'science_news', url: 'http://feeds.feedburner.com/daily-express-science', category: 'science' },
            { title: 'history_news', url: 'http://feeds.feedburner.com/daily-express-history', category: 'misc' },
            { title: 'weird_news', url: 'http://feeds.feedburner.com/daily-express-weird-news', category: 'misc' },
            { title: 'sports_news', url: 'http://feeds.feedburner.com/daily-express-sport-news', category: 'sports' },
            { title: 'showbiz_news', url: 'http://feeds.feedburner.com/daily-express-showbiztv', category: 'entertainment' },
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
            if (!news['title'] ||
                news['title'].length == 0 ||
                typeof news['title'] != 'string') {
                    continue
            }
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            newsObj.description = super.sanitizeHtml(news['description'])
            if (newsObj.description.length == 0 ||
                typeof newsObj.description != 'string') {
                newsObj.description = 'No description provided.'
            }
            newsObj.category = obj.category
            newsObj.headline = obj.title
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
