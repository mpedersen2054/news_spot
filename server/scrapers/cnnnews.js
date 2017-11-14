let Scraper = require('./base')

module.exports = class CNNNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'CNN News'
        this.leaning = 'l'
        this.website = 'http://www.cnn.com/'
        this.logo = 'https://i.imgur.com/V3YgO57.png'
        this.urls = [
            { title: 'top_news', url: 'http://rss.cnn.com/rss/cnn_topstories.rss', category: 'top' },
            { title: 'world_news', url: 'http://rss.cnn.com/rss/cnn_world.rss', category: 'international' },
            { title: 'us_news', url: 'http://rss.cnn.com/rss/cnn_us.rss', category: 'us' },
            { title: 'business_news', url: 'http://rss.cnn.com/rss/money_latest.rss', category: 'economy' },
            { title: 'politics_news', url: 'http://rss.cnn.com/rss/cnn_allpolitics.rss', category: 'politics' },
            { title: 'technology_news', url: 'http://rss.cnn.com/rss/cnn_tech.rss', category: 'technology' },
            { title: 'health_news', url: 'http://rss.cnn.com/rss/cnn_health.rss', category: 'health' },
            { title: 'entertainment_news', url: 'http://rss.cnn.com/rss/cnn_showbiz.rss', category: 'entertainment' },
            { title: 'travel_news', url: 'http://rss.cnn.com/rss/cnn_travel.rss', category: 'travel' },
            { title: 'living_news', url: 'http://rss.cnn.com/rss/cnn_living.rss', category: 'misc' },
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
            if (news['media:group'] &&
                news['media:group']['media:content'] &&
                news['media:group']['media:content'][0] &&
                news['media:group']['media:content'][0]['url']) {
                    newsObj.thumbnail = news['media:group']['media:content'][0]['url']
            } else {
                // if no prop, use placeholder
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // might want to remove all of the HTML stuff from the description?
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
