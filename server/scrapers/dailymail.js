let Scraper = require('./base')

module.exports = class DailyMail extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Daily Mail'
        this.leaning = 'i'
        this.website = 'http://www.dailymail.co.uk/ushome/index.html'
        this.logo = 'http://via.placeholder.com/350x150.png'
        this.urls = [
            { title: 'top_news', url: 'http://www.dailymail.co.uk/news/index.rss', category: 'top' },
            { title: 'us_news', url: 'http://www.dailymail.co.uk/ushome/index.rss', category: 'us' },
            { title: 'sports_news', url: 'http://www.dailymail.co.uk/sport/index.rss', category: 'sports' },
            { title: 'showbiz_news', url: 'http://www.dailymail.co.uk/tvshowbiz/index.rss', category: 'entertainment' },
            { title: 'health_news', url: 'http://www.dailymail.co.uk/health/index.rss', category: 'health' },
            { title: 'sciencetech_news', url: 'http://www.dailymail.co.uk/sciencetech/index.rss', category: 'science' },
            { title: 'money_news', url: 'http://www.dailymail.co.uk/money/index.rss', category: 'economy' },
            { title: 'travel_news', url: 'http://www.dailymail.co.uk/travel/index.rss', category: 'travel' },
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
