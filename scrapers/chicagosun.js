let Scraper = require('./base')

module.exports = class ChicagoSun extends Scraper {
    constructor(urls) {
        super()
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
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            newsObj.thumbnail = 'http://placehold.it/250x200'
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
