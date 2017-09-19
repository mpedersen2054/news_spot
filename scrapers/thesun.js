let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class TheSun extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'world_news', url: 'http://www.thesundaily.my/rss/world', category: 'international' },
            { title: 'business_news', url: 'http://www.thesundaily.my/rss/business', category: 'economy' },
            { title: 'sports_news', url: 'http://www.thesundaily.my/rss/sports', category: 'sports' },
            { title: 'showbiz_news', url: 'http://www.thesundaily.my/rss/showbiz', category: 'entertainment' },
            { title: 'health_news', url: 'http://www.thesundaily.my/rss/lifestyle/health', category: 'health' },
            { title: 'technology_news', url: 'http://www.thesundaily.my/rss/lifestyle/tech', category: 'technology' },
            { title: 'travel_news', url: 'http://www.thesundaily.my/rss/lifestyle/travel', category: 'travel' },
            { title: 'education_news', url: 'http://www.thesundaily.my/rss/education', category: 'education' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            var newsObj = {}
            // console.log(news)
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
