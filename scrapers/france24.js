let Scraper = require('./base')

module.exports = class France24 extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://www.france24.com/en/top-stories/rss', category: 'top' },
            { title: 'eu_news', url: 'http://www.france24.com/en/europe/rss', category: 'eu' },
            { title: 'france_news', url: 'http://www.france24.com/en/france/rss', category: 'eu' },
            { title: 'africa_news', url: 'http://www.france24.com/en/africa/rss', category: 'af' },
            { title: 'middleeast_news', url: 'http://www.france24.com/en/middle-east/rss', category: 'me' },
            { title: 'americas_news', url: 'http://www.france24.com/en/americas/rss', category: 'us' },
            { title: 'asia_news', url: 'http://www.france24.com/en/asia-pacific/rss', category: 'asia' },
            { title: 'technology_news', url: 'http://www.france24.com/en/business-tech/rss', category: 'technology' },
            { title: 'culture_news', url: 'http://www.france24.com/en/culture/rss', category: 'misc' },
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
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
