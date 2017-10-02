let Scraper = require('./base')

module.exports = class HuffPost extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Huffington Post'
        this.leaning = 'l'
        this.website = 'https://www.huffingtonpost.com/?country=US'
        this.urls = [
            { title: 'world_news', url: 'http://www.huffingtonpost.com/section/world-news/feed', category: 'international' },
            { title: 'business_news', url: 'http://www.huffingtonpost.com/section/business/feed', category: 'economy' },
            { title: 'college_news', url: 'http://www.huffingtonpost.com/section/college/feed', category: 'education' },
            { title: 'crime_news', url: 'http://www.huffingtonpost.com/section/crime/feed', category: 'us' },
            { title: 'health_news', url: 'http://www.huffingtonpost.com/section/healthy-living/feed', category: 'health' },
            { title: 'politics_news', url: 'http://www.huffingtonpost.com/section/politics/feed', category: 'health' },
            { title: 'style_news', url: 'http://www.huffingtonpost.com/section/style/feed', category: 'entertainment' },
            { title: 'tv_news', url: 'http://www.huffingtonpost.com/section/tv/feed', category: 'entertainment' },
            { title: 'arts_news', url: 'http://www.huffingtonpost.com/section/arts/feed', category: 'entertainment' },
            { title: 'blacks_news', url: 'http://www.huffingtonpost.com/section/black-voices/feed', category: 'us' },
            { title: 'celebrity_news', url: 'http://www.huffingtonpost.com/section/celebrity/feed', category: 'entertainment' },
            { title: 'comedy_news', url: 'http://www.huffingtonpost.com/section/comedy/feed', category: 'misc' },
            { title: 'washingtondc_news', url: 'http://www.huffingtonpost.com/topic/washington-dc/feed', category: 'us' },
            { title: 'green_news', url: 'http://www.huffingtonpost.com/section/green/feed', category: 'environment' },
            { title: 'media_news', url: 'http://www.huffingtonpost.com/section/media/feed', category: 'us' },
            { title: 'queer_news', url: 'http://www.huffingtonpost.com/section/queer-voices/feed', category: 'misc' },
            { title: 'science_news', url: 'http://www.huffingtonpost.com/section/science/feed', category: 'science' },
            { title: 'taste_news', url: 'http://www.huffingtonpost.com/section/taste/feed', category: 'misc' },
            { title: 'worldpost_news', url: 'http://www.huffingtonpost.com/section/theworldpost/feed', category: 'international' },
            { title: 'us_news', url: 'http://www.huffingtonpost.com/section/us-news/feed', category: 'us' },
            { title: 'weird_news', url: 'http://www.huffingtonpost.com/section/weird-news/feed', category: 'misc' },
            { title: 'books_news', url: 'http://www.huffingtonpost.com/section/books/feed', category: 'entertainment' },
            { title: 'chicago_news', url: 'http://www.huffingtonpost.com/topic/chicago/feed', category: 'us' },
            { title: 'education_news', url: 'http://www.huffingtonpost.com/section/education/feed', category: 'education' },
            { title: 'miami_news', url: 'http://www.huffingtonpost.com/topic/miami/feed', category: 'us' },
            { title: 'parents_news', url: 'http://www.huffingtonpost.com/section/parents/feed', category: 'misc' },
            { title: 'religion_news', url: 'http://www.huffingtonpost.com/section/religion/feed', category: 'misc' },
            { title: 'sports_news', url: 'http://www.huffingtonpost.com/section/sports/feed', category: 'sports' },
            { title: 'technology_news', url: 'http://www.huffingtonpost.com/section/technology/feed', category: 'technology' },
            { title: 'travel_news', url: 'http://www.huffingtonpost.com/section/travel/feed', category: 'travel' },
            { title: 'women_news', url: 'http://www.huffingtonpost.com/section/women/feed', category: 'misc' },
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
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
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
