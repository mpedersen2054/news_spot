let Scraper = require('./base')

module.exports = class ChristianScience extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Christian Science Monitor'
        this.leaning = 'r'
        this.website = 'https://www.csmonitor.com/'
        this.urls = [
            { title: 'top_news', url: 'http://rss.csmonitor.com/feeds/csm', category: 'top' },
            { title: 'arts_news', url: 'http://rss.csmonitor.com/feeds/arts', category: 'entertainment' },
            { title: 'books_news', url: 'http://rss.csmonitor.com/feeds/books', category: 'entertainment' },
            { title: 'commentary_news', url: 'http://rss.csmonitor.com/feeds/commentary', category: 'misc' },
            { title: 'dcdecoder_news', url: 'http://rss.csmonitor.com/feeds/dcdecoder', category: 'politics' },
            { title: 'environment_news', url: 'http://rss.csmonitor.com/feeds/environment', category: 'science' },
            { title: 'innovation_news', url: 'http://rss.csmonitor.com/feeds/scitech', category: 'science' },
            { title: 'living_news', url: 'http://rss.csmonitor.com/feeds/living', category: 'health' },
            { title: 'business_news', url: 'http://rss.csmonitor.com/feeds/wam', category: 'economy' },
            { title: 'politics_news', url: 'http://rss.csmonitor.com/feeds/politics', category: 'politics' },
            { title: 'science_news', url: 'http://rss.csmonitor.com/feeds/science', category: 'science' },
            { title: 'culture_news', url: 'http://rss.csmonitor.com/feeds/theculture', category: 'misc' },
            { title: 'us_news', url: 'http://rss.csmonitor.com/feeds/usa', category: 'us' },
            { title: 'world_news', url: 'http://rss.csmonitor.com/feeds/world', category: 'international' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js['rdf:RDF']['item']
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
            newsObj.published_at = new Date()
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
