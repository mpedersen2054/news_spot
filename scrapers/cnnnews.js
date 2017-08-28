let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class CNNNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_news', url: 'http://rss.cnn.com/rss/cnn_topstories.rss', category: 'top' }
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            // image is different for CNN, and not all of them contain the
            // media group property
            if (news['media:group']
                && news['media:group']['media:content']
                && news['media:group']['media:content'][0]
                && news['media:group']['media:content'][0]['url']) {
                    newsObj.thumbnail = news['media:group']['media:content'][0]['url']
            } else {
                // if no prop, use placeholder
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // might want to remove all of the HTML stuff from the description?
            newsObj.description = news['description']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
