let Scraper = require('./base')

module.exports = class TheIndependent extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Independent'
        this.leaning = 'i'
        this.website = 'http://www.independent.co.uk/us'
        this.urls = [
            { title: 'uk_news', url: 'http://www.independent.co.uk/news/uk/rss', category: 'uk' },
            { title: 'world_news', url: 'http://www.independent.co.uk/news/world/rss', category: 'international' },
            { title: 'business_news', url: 'http://www.independent.co.uk/news/business/rss', category: 'economy' },
            { title: 'science_news', url: 'http://www.independent.co.uk/news/science/rss', category: 'science' },
            // { title: 'education_news', url: 'http://www.independent.co.uk/news/education/rss', category: 'education' },
            { title: 'environment_news', url: 'http://www.independent.co.uk/environment/rss', category: 'environment' },
            { title: 'sports_news', url: 'http://www.independent.co.uk/sport/rss', category: 'sports' },
            { title: 'lifestyle_news', url: 'http://www.independent.co.uk/life-style/rss', category: 'misc' },
            { title: 'entertainment_news', url: 'http://www.independent.co.uk/arts-entertainment/rss', category: 'entertainment' },
            { title: 'travel_news', url: 'http://www.independent.co.uk/travel/rss', category: 'travel' },
            // { title: 'money_news', url: 'http://www.independent.co.uk/money/rss', category: 'economy' },
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
            // console.log(news)
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['media:content'] && news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
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
