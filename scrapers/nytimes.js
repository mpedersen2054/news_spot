let Scraper = require('./base')

module.exports = class NYTimes extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml', category: 'top' },
            { title: 'world_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/World.xml', category: 'international' },
            { title: 'eu_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Europe.xml', category: 'eu' },
            { title: 'middleeast_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/MiddleEast.xml', category: 'me' },
            { title: 'asia_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml', category: 'asia' },
            { title: 'us_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/US.xml', category: 'us' },
            { title: 'education_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Education.xml', category: 'education' },
            { title: 'politics_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Politics.xml', category: 'politics' },
            { title: 'ny_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/NYRegion.xml', category: 'us' },
            { title: 'business_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Business.xml', category: 'economy' },
            { title: 'energy_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/EnergyEnvironment.xml', category: 'environment' },
            { title: 'economy_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Economy.xml', category: 'economy' },
            { title: 'technology_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml', category: 'technology' },
            { title: 'sports_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml', category: 'sports' },
            { title: 'science_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Science.xml', category: 'science' },
            { title: 'environment_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Environment.xml', category: 'environment' },
            { title: 'space_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Space.xml', category: 'science' },
            { title: 'health_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Health.xml', category: 'health' },
            { title: 'health_research_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Research.xml', category: 'health' },
            { title: 'arts_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Arts.xml', category: 'entertainment' },
            { title: 'movies_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Movies.xml', category: 'entertainment' },
            { title: 'fashion_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml', category: 'entertainment' },
            { title: 'travel_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Travel.xml', category: 'travel' },
            { title: 'jobs_news', url: 'http://www.nytimes.com/services/xml/rss/nyt/JobMarket.xml', category: 'economy' },
            { title: 'cars_news', url: 'http://rss.nytimes.com/services/xml/rss/nyt/Automobiles.xml', category: 'misc' },
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
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['media:content'] && news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
