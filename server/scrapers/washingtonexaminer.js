let Scraper = require('./base')

module.exports = class WashingtonExaminer extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Washington Examiner'
        this.leaning = 'l'
        this.website = 'http://www.washingtonexaminer.com/'
        this.urls = [
            { title: 'politics_news', url: 'http://www.washingtonexaminer.com/rss/politics', category: 'politics' },
            { title: 'policy_news', url: 'http://www.washingtonexaminer.com/rss/policy', category: 'politics' },
            { title: 'nationalsecurity_news', url: 'http://www.washingtonexaminer.com/rss/national-security', category: 'us' },
            { title: 'environment_news', url: 'http://www.washingtonexaminer.com/rss/energy-and-environment', category: 'environment' },
            { title: 'healthcare_news', url: 'http://www.washingtonexaminer.com/rss/healthcare', category: 'politics' },
            { title: 'economy_news', url: 'http://www.washingtonexaminer.com/rss/economy', category: 'economy' },
            { title: 'technology_news', url: 'http://www.washingtonexaminer.com/rss/technology', category: 'technology' },
            { title: 'law_news', url: 'http://www.washingtonexaminer.com/rss/law', category: 'misc' },
            { title: 'foreignpolicy_news', url: 'http://www.washingtonexaminer.com/rss/foreign-policy', category: 'politics' },
            { title: 'us_news', url: 'http://www.washingtonexaminer.com/rss/news', category: 'us' },
            { title: 'opinion_news', url: 'http://www.washingtonexaminer.com/rss/opinion', category: 'misc' },
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
