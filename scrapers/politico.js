let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class Politico extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'congress_news', url: 'http://www.politico.com/rss/congress.xml', category: 'politics' },
        ]
    }

    // EU ONLY HAD 1 ITEM, SOMEHOW THIS MESSED UP GIVING
    // TypeError: data[Symbol.iterator] is not a function error

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        console.log(typeof data)
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            var newsObj = {}
            console.log(news)
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // when there is no description, politico makes it : description: {}
            if (typeof news['description'] !== 'string') {
                newsObj.description = 'No description provided.'
            } else {
                newsObj.description = news['description']
            }
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
