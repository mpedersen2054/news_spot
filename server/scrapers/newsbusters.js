let Scraper = require('./base')

module.exports = class NewsBusters extends Scraper {
    constructor(urls) {
        super()
        this.name = 'News Busters'
        this.leaning = 'r'
        this.website = 'https://www.newsbusters.org/'
        this.urls = [
            { title: 'top_news', url: 'https://www.newsbusters.org/blog/feed', category: 'top' },
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
            // need to remove html from description
            newsObj.description = news['description']
            newsObj.category = obj.category
            newsObj.headline = obj.title
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
