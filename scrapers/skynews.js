let Scraper = require('./base')

module.exports = class SkyNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://feeds.skynews.com/feeds/rss/home.xml', category: 'top' },
            { title: 'uk_news', url: 'http://feeds.skynews.com/feeds/rss/uk.xml', category: 'uk' },
            { title: 'world_news', url: 'http://feeds.skynews.com/feeds/rss/world.xml', category: 'international' },
            { title: 'us_news', url: 'http://feeds.skynews.com/feeds/rss/us.xml', category: 'us' },
            { title: 'business_news', url: 'http://feeds.skynews.com/feeds/rss/business.xml', category: 'economy' },
            { title: 'politics_news', url: 'http://feeds.skynews.com/feeds/rss/politics.xml', category: 'politics' },
            { title: 'technology_news', url: 'http://feeds.skynews.com/feeds/rss/technology.xml', category: 'technology' },
            { title: 'entertainment_news', url: 'http://feeds.skynews.com/feeds/rss/entertainment.xml', category: 'entertainment' },
            { title: 'strange_news', url: 'http://feeds.skynews.com/feeds/rss/strange.xml', category: 'misc' },
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
