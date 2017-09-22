// let axios = require('axios')
// let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ZeroHedge extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://feeds.feedburner.com/zerohedge/feed', category: 'top' },
        ]
    }

    format(obj) {
        // console.log('hiiiiii')
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            // there is no pub date for some reason
            newsObj.published_at = new Date(news['pubDate'])
            if (news['enclosure'] && news['enclosure']['url']) {
                newsObj.thumbnail = news['enclosure']['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // need to remove html from description
            newsObj.description = super.sanitizeHtml(news['description'])
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
