let Scraper = require('./base')

module.exports = class ChicagoSun extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Chicago Sun Times'
        this.leaning = 'l'
        this.website = 'http://chicago.suntimes.com/'
        this.logo = 'https://i.imgur.com/mrVRe85.png'
        this.urls = [
            { title: 'top_news', url: 'http://www.thesuntimes.com/news?template=rss&mime=xml', category: 'top' },
            { title: 'education_news', url: 'http://www.thesuntimes.com/news/education?template=rss&mime=xml', category: 'education' },
            { title: 'entertainment_news', url: 'http://www.thesuntimes.com/entertainment/books?template=rss&mime=xml', category: 'entertainment' },
            { title: 'celebrity_news', url: 'http://www.thesuntimes.com/entertainment/celebrity-news?template=rss&mime=xml', category: 'entertainment' },
            { title: 'movies_news', url: 'http://www.thesuntimes.com/entertainment/movies?template=rss&mime=xml', category: 'entertainment' },
            { title: 'music_news', url: 'http://www.thesuntimes.com/entertainment/music?template=rss&mime=xml', category: 'music' },
            { title: 'food_news', url: 'http://www.thesuntimes.com/lifestyle/food?template=rss&mime=xml', category: 'misc' },
            { title: 'health_news', url: 'http://www.thesuntimes.com/lifestyle/health?template=rss&mime=xml', category: 'health' },
            { title: 'travel_news', url: 'http://www.thesuntimes.com/lifestyle/travel?template=rss&mime=xml', category: 'travel' },
            { title: 'opinion_news', url: 'http://www.thesuntimes.com/opinion?template=rss&mime=xml', category: 'misc' },
            { title: 'business_news', url: 'http://www.thesuntimes.com/business-news?template=rss&mime=xml', category: 'economy' },
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
            newsObj.thumbnail = 'http://placehold.it/250x200'
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
