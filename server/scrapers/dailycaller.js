let Scraper = require('./base')

module.exports = class DailyCaller extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Daily Caller'
        this.leaning = 'r'
        this.website = 'http://dailycaller.com/'
        this.logo = 'https://i.imgur.com/cdbp4xP.png'
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
            newsObj.thumbnail = 'http://placehold.it/250x200'
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
