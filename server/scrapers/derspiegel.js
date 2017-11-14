let Scraper = require('./base')

module.exports = class DerSpiegel extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Der Spiegel'
        this.leaning = 'l'
        this.website = 'http://www.spiegel.de/international/'
        this.logo = 'https://i.imgur.com/lhTiCUF.png'
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
