let Scraper = require('./base')

module.exports = class TheIndependent extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Independent'
        this.leaning = 'i'
        this.website = 'http://www.independent.co.uk/us'
        this.logo = 'https://i.imgur.com/b1phAhZ.png'
        this.urls = [
            { title: 'uk_news', url: 'http://www.independent.co.uk/news/uk/rss', category: 'uk' },
            { title: 'world_news', url: 'http://www.independent.co.uk/news/world/rss', category: 'international' },
            { title: 'business_news', url: 'http://www.independent.co.uk/news/business/rss', category: 'economy' },
            { title: 'science_news', url: 'http://www.independent.co.uk/news/science/rss', category: 'science' },
            { title: 'education_news', url: 'http://www.independent.co.uk/news/education/rss', category: 'education' },
            { title: 'environment_news', url: 'http://www.independent.co.uk/environment/rss', category: 'environment' },
            { title: 'sports_news', url: 'http://www.independent.co.uk/sport/rss', category: 'sports' },
            { title: 'lifestyle_news', url: 'http://www.independent.co.uk/life-style/rss', category: 'misc' },
            { title: 'entertainment_news', url: 'http://www.independent.co.uk/arts-entertainment/rss', category: 'entertainment' },
            { title: 'travel_news', url: 'http://www.independent.co.uk/travel/rss', category: 'travel' },
            { title: 'money_news', url: 'http://www.independent.co.uk/money/rss', category: 'economy' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return []
        }
        if (typeof data != 'array') {
            data = [data]
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
            if (news['media:content'] && news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
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
