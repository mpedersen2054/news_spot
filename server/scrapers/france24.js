let Scraper = require('./base')

module.exports = class France24 extends Scraper {
    constructor(urls) {
        super()
        this.name = 'France 24'
        this.leaning = 'l'
        this.website = 'http://www.france24.com/en/'
        this.logo = 'https://i.imgur.com/4ivq2Jl.png'
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
