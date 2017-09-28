let Scraper = require('./base')

module.exports = class NYDaily extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Daily News'
        this.leaning = 'l'
        this.website = 'http://www.nydailynews.com/'
        this.urls = [
            { title: 'ny_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Local.rss', category: 'us' },
            { title: 'us_news', url: 'http://www.nydailynews.com/cmlink/NYDN.News.National.rss', category: 'us' },
            { title: 'world_news', url: 'http://www.nydailynews.com/cmlink/NYDN.News.World.rss', category: 'international' },
            { title: 'politics_news', url: 'http://www.nydailynews.com/cmlink/NYDN.News.Politics.rss', category: 'politics' },
            { title: 'crime_news', url: 'http://www.nydailynews.com/cmlink/NYDN.News.Crime.rss', category: 'us' },
            { title: 'sports_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Sports.rss', category: 'sports' },
            { title: 'entertainment_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Entertainment.rss', category: 'entertainment' },
            { title: 'opinion_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Opinion.rss', category: 'misc' },
            { title: 'lifestyle_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Life_Style.rss', category: 'health' },
            { title: 'realestate_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Real_Estate.rss', category: 'economy' },
            { title: 'food_news', url: 'http://www.nydailynews.com/cmlink/NYDN.Life_Style.Eats.rss', category: 'entertainment' },
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
            if (news['media:content'] && news['media:content']['url']) {
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