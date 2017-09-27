let Scraper = require('./base')

module.exports = class ABCNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'ABC News'
        this.leaning = 'l'
        this.website = 'http://abcnews.go.com/'
        this.urls = [
            { title: 'top_news', url: 'http://abcnews.go.com/abcnews/topstories', category: 'top' },
            { title: 'international_news', url: 'http://abcnews.go.com/abcnews/internationalheadlines', category: 'international' },
            { title: 'us_news', url: 'http://abcnews.go.com/abcnews/usheadlines', category: 'us' },
            { title: 'politics_news', url: 'http://abcnews.go.com/abcnews/politicsheadlines', category: 'politics' },
            { title: 'blotter_news', url: 'http://abcnews.go.com/abcnews/blotterheadlines', category: 'misc' },
            { title: 'money_news', url: 'http://abcnews.go.com/abcnews/moneyheadlines', category: 'economy' },
            { title: 'technology_news', url: 'http://abcnews.go.com/abcnews/technologyheadlines', category: 'technology' },
            { title: 'health_news', url: 'http://abcnews.go.com/abcnews/healthheadlines', category: 'health' },
            { title: 'entertainment_news', url: 'http://abcnews.go.com/abcnews/entertainmentheadlines', category: 'entertainment' },
            { title: 'travel_news', url: 'http://abcnews.go.com/abcnews/travelheadlines', category: 'travel' },
            { title: 'sports_news', url: 'http://abcnews.go.com/abcnews/sportsheadlines', category: 'sports' },
            { title: 'worldnews_news', url: 'http://abcnews.go.com/abcnews/worldnewsheadlines', category: 'international' },
            { title: '2020_news', url: 'http://abcnews.go.com/abcnews/2020headlines', category: 'politics' },
            { title: 'primetime_news', url: 'http://abcnews.go.com/abcnews/primetimeheadlines', category: 'politics' },
            { title: 'nighttime_news', url: 'http://abcnews.go.com/abcnews/nightlineheadlines', category: 'politics' },
            { title: 'gma_news', url: 'http://abcnews.go.com/abcnews/gmaheadlines', category: 'entertainment' },
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
            newsObj.thumbnail = news['media:thumbnail'][3]['url']
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
