let Scraper = require('./base')

module.exports = class FreeBeacon extends Scraper {
    constructor(urls) {
        super()
        this.name = 'http://freebeacon.com/'
        this.leaning = 'r'
        this.website = 'http://freebeacon.com/'
        this.urls = [
            { title: 'top_news', url: 'http://feeds.feedburner.com/FreeBeacon', category: 'top' },
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
