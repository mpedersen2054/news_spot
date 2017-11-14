let Scraper = require('./base')

module.exports = class LATimes extends Scraper {
    constructor(urls) {
        super()
        this.name = 'LA Times'
        this.leaning = 'l'
        this.website = 'http://www.latimes.com/hp-2/'
        this.logo = 'https://i.imgur.com/VeOa9te.png'
        this.urls = [
            { title: 'la_news', url: 'http://www.latimes.com/local/rss2.0.xml', category: 'us' },
            { title: 'sports_news', url: 'http://www.latimes.com/sports/rss2.0.xml', category: 'sports' },
            { title: 'entertainment_news', url: 'http://www.latimes.com/entertainment/rss2.0.xml', category: 'entertainment' },
            { title: 'us_news', url: 'http://www.latimes.com/nation/rss2.0.xml', category: 'us' },
            { title: 'world_news', url: 'http://www.latimes.com/world/rss2.0.xml', category: 'international' },
            { title: 'business_news', url: 'http://www.latimes.com/business/rss2.0.xml', category: 'economy' },
            { title: 'opinion_news', url: 'http://www.latimes.com/opinion/rss2.0.xml', category: 'misc' },
            { title: 'style_news', url: 'http://www.latimes.com/style/rss2.0.xml', category: 'entertainment' },
            { title: 'travel_news', url: 'http://www.latimes.com/travel/rss2.0.xml', category: 'travel' },
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
            if (news['media:thumbnail'] && news['media:thumbnail']['url']) {
                newsObj.thumbnail = news['media:thumbnail']['url']
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
