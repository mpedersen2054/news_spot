let Scraper = require('./base')

module.exports = class CBSNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'CBS News'
        this.leaning = 'i'
        this.website = 'https://www.cbsnews.com/'
        this.urls = [
            { title: 'latest_news', url: 'https://www.cbsnews.com/latest/rss/main', category: 'top' },
            { title: 'us_news', url: 'https://www.cbsnews.com/latest/rss/us', category: 'us' },
            { title: 'politics_news', url: 'https://www.cbsnews.com/latest/rss/politics', category: 'politics' },
            { title: 'international_news', url: 'https://www.cbsnews.com/latest/rss/world', category: 'international' },
            { title: 'technology_news', url: 'https://www.cbsnews.com/latest/rss/tech', category: 'technology' },
            { title: 'health_news', url: 'https://www.cbsnews.com/latest/rss/health', category: 'health' },
            { title: 'entertainment_news', url: 'https://www.cbsnews.com/latest/rss/entertainment', category: 'entertainment' },
            { title: 'economy_news', url: 'https://www.cbsnews.com/latest/rss/moneywatch', category: 'economy' },
            { title: 'evening_news', url: 'https://www.cbsnews.com/latest/rss/evening-news-cbs-news-investigates', category: 'misc' },
            { title: 'opinion_news', url: 'https://www.cbsnews.com/latest/rss/opinion', category: 'misc' },
            { title: 'morning_news', url: 'https://www.cbsnews.com/latest/rss/cbs-this-morning', category: 'misc' },
            { title: '48_hours_news', url: 'https://www.cbsnews.com/latest/rss/48-hours', category: 'misc' },
            { title: '60_minutes_news', url: 'https://www.cbsnews.com/latest/rss/60-minutes', category: 'misc' },
            { title: 'face_the_nation_news', url: 'https://www.cbsnews.com/latest/rss/face-the-nation', category: 'politics' },
        ]
    }

    // override of Base, the thumbnail wasnt the same
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
            newsObj.published_at = new Date(news['pubDate'])
            if (news['image']) {
                newsObj.thumbnail = news['image']
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
            // // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return newData
    }
}
