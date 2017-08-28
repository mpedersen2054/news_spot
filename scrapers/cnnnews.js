let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class CNNNews extends Scraper {
    constructor(urls) {
        super()
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
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            // image is different for CNN, and not all of them contain the
            // media group property
            if (news['media:group']
                && news['media:group']['media:content']
                && news['media:group']['media:content'][0]
                && news['media:group']['media:content'][0]['url']) {
                    newsObj.thumbnail = news['media:group']['media:content'][0]['url']
            } else {
                // if no prop, use placeholder
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // might want to remove all of the HTML stuff from the description?
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
