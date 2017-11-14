let Scraper = require('./base')

module.exports = class Politico extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Politico'
        this.leaning = 'l'
        this.website = 'http://www.politico.com/'
        this.logo = 'https://i.imgur.com/Z6S5TQj.png'
        this.urls = [
            { title: 'congress_news', url: 'http://www.politico.com/rss/congress.xml', category: 'politics' },
            { title: 'healthcare_news', url: 'http://www.politico.com/rss/healthcare.xml', category: 'politics' },
            { title: 'defense_news', url: 'http://www.politico.com/rss/defense.xml', category: 'us' },
            { title: 'economy_news', url: 'http://www.politico.com/rss/economy.xml', category: 'economy' },
            { title: 'energy_news', url: 'http://www.politico.com/rss/energy.xml', category: 'economy' },
            { title: 'politics_news', url: 'http://www.politico.com/rss/politics08.xml', category: 'politics' },
            { title: 'technology_news', url: 'http://www.politico.com/rss/morningtech.xml', category: 'technology' },
            { title: 'money_news', url: 'http://www.politico.com/rss/morningmoney.xml', category: 'economy' },
            { title: 'transportation_news', url: 'http://www.politico.com/rss/morningtransportation.xml', category: 'travel' },
            { title: 'education_news', url: 'http://www.politico.com/rss/morningeducation.xml', category: 'education' },
            { title: 'agriculture_news', url: 'http://www.politico.com/rss/morningagriculture.xml', category: 'environment' },
            { title: 'cybersecurity_news', url: 'http://www.politico.com/rss/morningcybersecurity.xml', category: 'technology' },
            { title: 'health_news', url: 'http://www.politico.com/rss/morningehealth.xml', category: 'health' },
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
