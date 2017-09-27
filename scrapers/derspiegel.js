let Scraper = require('./base')

module.exports = class DerSpiegel extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Der Spiegel'
        this.leaning = 'l'
        this.website = 'http://www.spiegel.de/international/'
        this.urls = [
            { title: 'top_news', url: 'http://www.spiegel.de/international/index.rss', category: 'top' },
            { title: 'eu_news', url: 'http://www.spiegel.de/international/europe/index.rss', category: 'eu' },
            { title: 'world_news', url: 'http://www.spiegel.de/international/world/index.rss', category: 'international' },
            { title: 'business_news', url: 'http://www.spiegel.de/international/business/index.rss', category: 'economy' },
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
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
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
