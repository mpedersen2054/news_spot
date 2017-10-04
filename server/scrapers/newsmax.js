let Scraper = require('./base')

module.exports = class Newsmax extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Newsmax'
        this.leaning = 'r'
        this.website = 'http://www.newsmax.com/'
        this.urls = [
            { title: 'top_news', url: 'https://www.newsmax.com/rss/Newsfront/16/', category: 'top' },
            { title: 'us_news', url: 'https://www.newsmax.com/rss/US/18/', category: 'us' },
            { title: 'politics_news', url: 'https://www.newsmax.com/rss/Politics/1/', category: 'politics' },
            { title: 'science_news', url: 'https://www.newsmax.com/rss/SciTech/20/', category: 'science' },
            { title: 'health_news', url: 'https://www.newsmax.com/rss/Health-News/177/', category: 'health' },
            { title: 'cancer_news', url: 'https://www.newsmax.com/rss/Cancer/178/', category: 'health' },
            { title: 'finance_news', url: 'https://www.newsmax.com/rss/Headline/76/', category: 'economy' },
            { title: 'economy_news', url: 'https://www.newsmax.com/rss/Economy/2/', category: 'economy' },
            { title: 'business_news', url: 'https://www.newsmax.com/rss/Companies/6/', category: 'economy' },
            { title: 'world_news', url: 'https://www.newsmax.com/rss/Headline/155/', category: 'international' },
            { title: 'eu_news', url: 'https://www.newsmax.com/rss/Europe/160/', category: 'eu' },
            { title: 'asia_news', url: 'https://www.newsmax.com/rss/Asia/159/', category: 'asia' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return []
        }
        // if (typeof data != 'array') {
        //     data = [data]
        // }
        for (var news of data) {
            var newsObj = {}
            // if (!news['title']) {
            //     continue
            // }
            // some reason the new addition of on line 32 & 38 make this break?
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // need to remove html from description
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
