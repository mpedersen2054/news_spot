let Scraper = require('./base')

module.exports = class NYPost extends Scraper {
    constructor(urls) {
        super()
        this.name = 'New York Post'
        this.leaning = 'i'
        this.website = 'http://nypost.com/'
        this.logo = 'https://i.imgur.com/FouE5zp.png'
        this.urls = [
            { title: 'top_news', url: 'http://nypost.com/news/feed/', category: 'top' },
            { title: 'ny_news', url: 'http://nypost.com/metro/feed/', category: 'us' },
            { title: 'sports_news', url: 'http://nypost.com/sports/feed/', category: 'sports' },
            { title: 'business_news', url: 'http://nypost.com/business/feed/', category: 'economy' },
            { title: 'opinion_news', url: 'http://nypost.com/opinion/feed/', category: 'misc' },
            { title: 'entertainment_news', url: 'http://nypost.com/entertainment/feed/', category: 'entertainment' },
            { title: 'fashion_news', url: 'http://nypost.com/fashion/feed/', category: 'entertainment' },
            { title: 'living_news', url: 'http://nypost.com/living/feed/', category: 'health' },
            { title: 'technology_news', url: 'http://nypost.com/tech/feed/', category: 'technology' },
            { title: 'media_news', url: 'http://nypost.com/media/feed/', category: 'entertainment' },
            { title: 'realestate_news', url: 'http://nypost.com/real-estate/feed/', category: 'economy' },
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
