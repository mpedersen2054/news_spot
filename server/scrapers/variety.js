let Scraper = require('./base')

module.exports = class Variety extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Variety'
        this.leaning = 'l'
        this.website = 'http://variety.com/'
        this.logo = 'https://i.imgur.com/dPYBHLH.png'
        this.urls = [
            { title: 'top_news', url: 'http://feeds.feedburner.com/variety/headlines', category: 'entertainment' },
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
            if (news['media:content'] &&
                news['media:content'][0] &&
                news['media:content'][0]['url']) {
                newsObj.thumbnail = news['media:content'][0]['url']
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
