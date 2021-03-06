let Scraper = require('./base')

module.exports = class WashingtonPost extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Washington Post'
        this.leaning = 'l'
        this.website = 'https://www.washingtonpost.com/'
        this.logo = 'https://i.imgur.com/IlWa4nw.png'
        this.urls = [
            { title: 'politics_news', url: 'http://feeds.washingtonpost.com/rss/politics', category: 'politics' },
            { title: 'opinion_news', url: 'http://feeds.washingtonpost.com/rss/opinions', category: 'misc' },
            { title: 'sports_news', url: 'http://feeds.washingtonpost.com/rss/sports', category: 'sports' },
            { title: 'us_news', url: 'http://feeds.washingtonpost.com/rss/national', category: 'us' },
            { title: 'world_news', url: 'http://feeds.washingtonpost.com/rss/world', category: 'international' },
            { title: 'business_news', url: 'http://feeds.washingtonpost.com/rss/business', category: 'economy' },
            { title: 'lifestyle_news', url: 'http://feeds.washingtonpost.com/rss/lifestyle', category: 'entertainment' },
            { title: 'entertainment_news', url: 'http://feeds.washingtonpost.com/rss/entertainment', category: 'entertainment' },
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
            if (news['pubDate']) {
                newsObj.published_at = new Date(news['pubDate'])
            } else {
                newsObj.published_at = new Date()
            }
            if (news['media:thumbnail'] && news['media:thumbnail']['url']) {
                newsObj.thumbnail = news['media:thumbnail']['url']
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
