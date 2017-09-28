let Scraper = require('./base')

module.exports = class WSJ extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Wallstreet Journal'
        this.leaning = 'r'
        this.website = 'https://www.wsj.com/'
        this.urls = [
            { title: 'world_news', url: 'http://www.wsj.com/xml/rss/3_7085.xml', category: 'international' },
            { title: 'business_news', url: 'http://www.wsj.com/xml/rss/3_7014.xml', category: 'economy' },
            { title: 'economy_news', url: 'http://www.wsj.com/xml/rss/3_7031.xml', category: 'economy' },
            { title: 'technology_news', url: 'http://www.wsj.com/xml/rss/3_7455.xml', category: 'technology' },
            { title: 'lifestyle_news', url: 'http://www.wsj.com/xml/rss/3_7201.xml', category: 'health' },
            { title: 'opinion_news', url: 'http://www.wsj.com/xml/rss/3_7041.xml', category: 'opinion' },
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
            if (news['media:content'] &&
                news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // need to remove html from description
            newsObj.description = news['description']
            newsObj.category = obj.category
            newsObj.headline = obj.title
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
