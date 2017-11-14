let Scraper = require('./base')

module.exports = class TheSun extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Sun'
        this.leaning = 'l'
        this.website = 'https://www.thesun.co.uk/'
        this.logo = 'https://i.imgur.com/iEpDQm2.png'
        this.urls = [
            { title: 'world_news', url: 'http://www.thesundaily.my/rss/world', category: 'international' },
            { title: 'business_news', url: 'http://www.thesundaily.my/rss/business', category: 'economy' },
            { title: 'sports_news', url: 'http://www.thesundaily.my/rss/sports', category: 'sports' },
            { title: 'showbiz_news', url: 'http://www.thesundaily.my/rss/showbiz', category: 'entertainment' },
            { title: 'health_news', url: 'http://www.thesundaily.my/rss/lifestyle/health', category: 'health' },
            { title: 'technology_news', url: 'http://www.thesundaily.my/rss/lifestyle/tech', category: 'technology' },
            { title: 'travel_news', url: 'http://www.thesundaily.my/rss/lifestyle/travel', category: 'travel' },
            { title: 'education_news', url: 'http://www.thesundaily.my/rss/education', category: 'education' },
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
