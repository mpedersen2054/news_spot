let Scraper = require('./base')

module.exports = class BBCNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'BBC News'
        this.leaning = 'l'
        this.website = 'http://www.bbc.com/news'
        this.urls = [
            { title: 'top_stories', url: 'http://feeds.bbci.co.uk/news/rss.xml', category: 'top' },
            { title: 'world_news', url: 'http://feeds.bbci.co.uk/news/world/rss.xml', category: 'international' },
            { title: 'uk_news', url: 'http://feeds.bbci.co.uk/news/uk/rss.xml', category: 'uk' },
            { title: 'business_news', url: 'http://feeds.bbci.co.uk/news/business/rss.xml', category: 'economy' },
            { title: 'politics_news', url: 'http://feeds.bbci.co.uk/news/politics/rss.xml', category: 'politics' },
            { title: 'health_news', url: 'http://feeds.bbci.co.uk/news/health/rss.xml', category: 'health' },
            { title: 'education_news', url: 'http://feeds.bbci.co.uk/news/education/rss.xml', category: 'education' },
            { title: 'science_and_environment_news', url: 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml', category: 'science' },
            { title: 'technology_news', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml', category: 'technology' },
            { title: 'entertainment_and_arts_news', url: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml', category: 'entertainment' },
        ]
    }

    // override of Base, the thumbnail wasnt the same
    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return { title: obj.title, category: obj.category, stories: [] }
        }
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['media:thumbnail'] && news['media:thumbnail']['url']) {
                newsObj.thumbnail = news['media:thumbnail']['url']
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
        return { title: obj.title, category: obj.category, stories: newData }
    }

}
