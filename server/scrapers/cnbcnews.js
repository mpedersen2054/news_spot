let Scraper = require('./base')

module.exports = class CNBCNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'CNBC News'
        this.leaning = 'l'
        this.website = 'https://www.cnbc.com/'
        this.logo = 'https://i.imgur.com/XZSypuD.png'
        this.urls = [
            { title: 'top_news', url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', category: 'top' },
            { title: 'world_news', url: 'https://www.cnbc.com/id/100727362/device/rss/rss.html', category: 'international' },
            { title: 'us_news', url: 'https://www.cnbc.com/id/15837362/device/rss/rss.html', category: 'us' },
            { title: 'asia_news', url: 'https://www.cnbc.com/id/19832390/device/rss/rss.html', category: 'asia' },
            { title: 'europe_news', url: 'https://www.cnbc.com/id/19794221/device/rss/rss.html', category: 'eu' },
            { title: 'business_news', url: 'https://www.cnbc.com/id/10001147/device/rss/rss.html', category: 'economy' },
            { title: 'earnings_news', url: 'https://www.cnbc.com/id/15839135/device/rss/rss.html', category: 'economy' },
            { title: 'commentary_news', url: 'https://www.cnbc.com/id/100370673/device/rss/rss.html', category: 'misc' },
            { title: 'economy_news', url: 'https://www.cnbc.com/id/20910258/device/rss/rss.html', category: 'economy' },
            { title: 'finance_news', url: 'https://www.cnbc.com/id/10000664/device/rss/rss.html', category: 'economy' },
            { title: 'technology_news', url: 'https://www.cnbc.com/id/19854910/device/rss/rss.html', category: 'technology' },
            { title: 'politics_news', url: 'https://www.cnbc.com/id/10000113/device/rss/rss.html', category: 'politics' },
            { title: 'health_care_news', url: 'https://www.cnbc.com/id/10000108/device/rss/rss.html', category: 'health' },
            { title: 'real_estate_news', url: 'https://www.cnbc.com/id/10000115/device/rss/rss.html', category: 'economy' },
            { title: 'wealth_news', url: 'https://www.cnbc.com/id/10001054/device/rss/rss.html', category: 'economy' },
            { title: 'autos_news', url: 'https://www.cnbc.com/id/10000101/device/rss/rss.html', category: 'misc' },
            { title: 'energy_news', url: 'https://www.cnbc.com/id/19836768/device/rss/rss.html', category: 'misc' },
            { title: 'media_news', url: 'https://www.cnbc.com/id/10000110/device/rss/rss.html', category: 'misc' },
            { title: 'retail_news', url: 'https://www.cnbc.com/id/10000116/device/rss/rss.html', category: 'economy' },
            { title: 'travel_news', url: 'https://www.cnbc.com/id/10000739/device/rss/rss.html', category: 'travel' },
            { title: 'small_business_news', url: 'https://www.cnbc.com/id/44877279/device/rss/rss.html', category: 'economy' },
            { title: 'investing_news', url: 'https://www.cnbc.com/id/15839069/device/rss/rss.html', category: 'economy' },
        ]
    }

    // override of Base, the thumbnail/picture doesnt exist for cnbc
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
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            newsObj.description = super.sanitizeHtml(news['description'])
            if (newsObj.description.length == 0 ||
                typeof newsObj.description != 'string') {
                newsObj.description = 'No description provided.'
            }
            newsObj.category = obj.category
            newsObj.headline = obj.title
            // // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
