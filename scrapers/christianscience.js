let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ChristianScience extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://rss.csmonitor.com/feeds/csm', category: 'top' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js['rdf:RDF']['item']
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date()
            newsObj.thumbnail = 'Not provided.'
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
