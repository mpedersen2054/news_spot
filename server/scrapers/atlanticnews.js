let Scraper = require('./base')

module.exports = class AtlanticNews extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Atlantic'
        this.leaning = 'l'
        this.website = 'https://www.theatlantic.com/'
        this.logo = 'https://i.imgur.com/GAXkgHW.png'
        this.urls = [
            { title: 'politics_news', url: 'https://www.theatlantic.com/feed/channel/politics/', category: 'politics' },
            { title: 'entertainment_news', url: 'https://www.theatlantic.com/feed/channel/entertainment/', category: 'entertainment' },
            { title: 'technology_news', url: 'https://www.theatlantic.com/feed/channel/technology/', category: 'technology' },
            { title: 'health_news', url: 'https://www.theatlantic.com/feed/channel/health/', category: 'health' },
            { title: 'sexs_news', url: 'https://www.theatlantic.com/feed/channel/sexes/', category: 'misc' },
            { title: 'science_news', url: 'https://www.theatlantic.com/feed/channel/science/', category: 'science' },
            { title: 'press_release_news', url: 'https://www.theatlantic.com/feed/channel/press-releases/', category: 'misc' },
            { title: 'business_news', url: 'https://www.theatlantic.com/feed/channel/business/', category: 'economy' },
            { title: 'international_news', url: 'https://www.theatlantic.com/feed/channel/international/', category: 'international' },
            { title: 'us_news', url: 'https://www.theatlantic.com/feed/channel/national/', category: 'us' },
            { title: 'top_news', url: 'https://www.theatlantic.com/feed/channel/news/', category: 'top' },
            { title: 'education_news', url: 'https://www.theatlantic.com/feed/channel/education/', category: 'education' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.feed.entry
        var newData = []
        if (!data) {
            return []
        }
        for (var news of data) {
            var newsObj = {}
            if (!news['title']['$t'] ||
                news['title']['$t'].length == 0 ||
                typeof news['title']['$t'] != 'string') {
                    continue
            }
            newsObj.title = news['title']['$t']
            if (news['published']) {
                newsObj.published_at = new Date(news['published'])
            } else {
                newsObj.published_at = new Date()
            }
            // thumbnail wasnt always provided
            if (news['media:content'] && news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            // if no link : https://www.theatlantic.com
            if (news['link'] && news['link']['href']) {
                newsObj.url = news['link']['href']
            } else {
                newsObj.url = 'https://www.theatlantic.com/'
            }

            if (news['summary'] && news['summary']['$t']) {
                newsObj.description = super.sanitizeHtml(news['summary']['$t'])
            } else {
                newsObj.description = 'No description.'
            }
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
