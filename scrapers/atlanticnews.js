let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class AtlanticNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'politics_news', url: 'https://www.theatlantic.com/feed/channel/politics/', category: 'politics' },
            // { title: 'entertainment_news', url: 'https://www.theatlantic.com/feed/channel/entertainment/', category: 'entertainment' },
            // { title: 'technology_news', url: 'https://www.theatlantic.com/feed/channel/technology/', category: 'technology' },
            // { title: 'health_news', url: 'https://www.theatlantic.com/feed/channel/health/', category: 'health' },
            // { title: 'sexs_news', url: 'https://www.theatlantic.com/feed/channel/sexes/', category: 'misc' },
            // { title: 'science_news', url: 'https://www.theatlantic.com/feed/channel/science/', category: 'science' },
            // { title: '', url: '', category: '' },
            // { title: '', url: '', category: '' },
            // { title: '', url: '', category: '' },
            // { title: '', url: '', category: '' },
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        // console.log(js)
        var data = js.feed.entry
        // console.log(data)
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']['$t']
            newsObj.published_at = new Date(news['published'])
            newsObj.thumbnail = news['media:content']['url']

            newsObj.url = news['link']['href']
            // might want to remove all of the HTML stuff from the description?
            newsObj.description = news['summary']['$t']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
