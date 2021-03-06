let Scraper = require('./base')

// COME BACK AND FIX ME!!!

module.exports = class BostonGlobe extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Boston Globe'
        this.leaning = 'l'
        this.website = 'https://www.bostonglobe.com/'
        this.logo = 'http://via.placeholder.com/350x150.png'
        this.urls = [
            { title: 'us_news', url: 'https://www.boston.com/tag/national-news/feed', category: 'us' },
            { title: 'world_news', url: 'https://www.boston.com/tag/world-news/feed', category: 'international' },
            { title: 'business_news', url: 'https://www.boston.com/tag/business/feed', category: 'economy' },
            { title: 'education_news', url: 'https://www.boston.com/tag/education/feed', category: 'education' },
            { title: 'finance_news', url: 'https://www.boston.com/tag/finance/feed', category: 'economy' },
            { title: 'health_news', url: 'https://www.boston.com/tag/health/feed', category: 'health' },
            { title: 'history_news', url: 'https://www.boston.com/tag/history/feed', category: 'misc' },
            { title: 'innovation_news', url: 'https://www.boston.com/tag/innovation/feed', category: 'science' },
            { title: 'jobs_news', url: 'https://www.boston.com/tag/jobs-news/feed', category: 'economy' },
            { title: 'politics_news', url: 'https://www.boston.com/tag/politics/feed', category: 'politics' },
            { title: 'science_news', url: 'https://www.boston.com/tag/science/feed', category: 'science' },
            { title: 'technology_news', url: 'https://www.boston.com/tag/technology/feed', category: 'technology' },
            { title: 'arts_news', url: 'https://www.boston.com/tag/arts/feed', category: 'entertainment' },
            { title: 'entertainment_news', url: 'https://www.boston.com/tag/entertainment/feed', category: 'entertainment' },
            { title: 'food_news', url: 'https://www.boston.com/tag/food/feed', category: 'entertainment' },
            { title: 'media_news', url: 'https://www.boston.com/tag/media/feed', category: 'misc' },
            { title: 'movies_news', url: 'https://www.boston.com/tag/movies/feed', category: 'entertainment' },
            { title: 'travel_news', url: 'https://www.boston.com/tag/travel/feed', category: 'travel' },
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
            newsObj.thumbnail = news['enclosure']['url']
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
