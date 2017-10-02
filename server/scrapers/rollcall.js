let Scraper = require('./base')

module.exports = class RollCall extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Roll Call'
        this.leaning = 'i'
        this.website = 'https://www.rollcall.com/'
        this.urls = [
            { title: 'top_news', url: 'https://www.rollcall.com/rss/tag/rss-feed/all-news', category: 'politics' },
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
