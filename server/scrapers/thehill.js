let Scraper = require('./base')

module.exports = class TheHill extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Hill'
        this.leaning = 'i'
        this.website = 'http://thehill.com/'
        this.urls = [
            { title: 'top_news', url: 'http://thehill.com/rss/syndicator/19110', category: 'top' },
            { title: 'administration_news', url: 'http://thehill.com/taxonomy/term/1132/feed', category: 'politics' },
            { title: 'senate_news', url: 'http://thehill.com/taxonomy/term/1130/feed', category: 'politics' },
            { title: 'houseofreps_news', url: 'http://thehill.com/taxonomy/term/1131/feed', category: 'politics' },
            { title: 'polls_news', url: 'http://thehill.com/taxonomy/term/1630/feed', category: 'politics' },
            { title: 'defense_news', url: 'http://thehill.com/taxonomy/term/39/feed', category: 'us' },
            { title: 'environment_news', url: 'http://thehill.com/taxonomy/term/28/feed', category: 'science' },
            { title: 'finance_news', url: 'http://thehill.com/taxonomy/term/30/feed', category: 'economy' },
            { title: 'healthcare_news', url: 'http://thehill.com/taxonomy/term/33/feed', category: 'politics' },
            { title: 'technology_news', url: 'http://thehill.com/taxonomy/term/27/feed', category: 'technology' },
            { title: 'transportation_news', url: 'http://thehill.com/taxonomy/term/38/feed', category: 'us' },
            { title: 'international_news', url: 'http://thehill.com/taxonomy/term/43/feed', category: 'international' },
            { title: 'business_news', url: 'http://thehill.com/taxonomy/term/20/feed', category: 'economy' },
            { title: 'editorials_news', url: 'http://thehill.com/taxonomy/term/1114/feed', category: 'misc' },
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
