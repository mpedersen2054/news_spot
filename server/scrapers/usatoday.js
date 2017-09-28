let Scraper = require('./base')

module.exports = class USAToday extends Scraper {
    constructor(urls) {
        super()
        this.name = 'USA Today'
        this.leaning = 'l'
        this.website = 'https://www.usatoday.com/'
        this.urls = [
            { title: 'us_news', url: 'http://rssfeeds.usatoday.com/UsatodaycomNation-TopStories', category: 'us' },
            { title: 'politics_news', url: 'http://rssfeeds.usatoday.com/UsatodaycomWashington-TopStories', category: 'politics' },
            { title: 'world_news', url: 'http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories', category: 'international' },
            { title: 'opinion_news', url: 'http://rssfeeds.usatoday.com/News-Opinion', category: 'misc' },
            { title: 'sports_news', url: 'http://rssfeeds.usatoday.com/UsatodaycomSports-TopStories', category: 'sports' },
            { title: 'life_news', url: 'http://rssfeeds.usatoday.com/usatoday-LifeTopStories', category: 'health' },
            { title: 'money_news', url: 'http://rssfeeds.usatoday.com/UsatodaycomMoney-TopStories', category: 'economy' },
            { title: 'technology_news', url: 'http://rssfeeds.usatoday.com/usatoday-TechTopStories', category: 'technology' },
            { title: 'travel_news', url: 'http://rssfeeds.usatoday.com/UsatodaycomTravel-TopStories', category: 'travel' },
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
            if (news['enclosure'] &&
                news['enclosure']['url'] &&
                news['enclosure']['url'] != '') {
                newsObj.thumbnail = news['enclosure']['url']
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
