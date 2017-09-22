let Scraper = require('./base')

module.exports = class WashingtonTimes extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'us_news', url: 'http://www.washingtontimes.com/rss/headlines/news/', category: 'us' },
            { title: 'culture_news', url: 'http://www.washingtontimes.com/rss/headlines/culture/', category: 'us' },
            { title: 'opinion_news', url: 'http://www.washingtontimes.com/rss/headlines/opinion/', category: 'misc' },
            { title: 'communities_news', url: 'http://www.washingtontimes.com/rss/headlines/communities/', category: 'us' },
            { title: 'advocacy_news', url: 'http://www.washingtontimes.com/rss/headlines/advocacy/', category: 'us' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            // there is no pub date for some reason
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            // need to remove html from description
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
