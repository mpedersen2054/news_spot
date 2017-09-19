let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class RollingStone extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'music_news', url: 'http://www.rollingstone.com/music/rss', category: 'entertainment' },
        ]
    }

    // EU ONLY HAD 1 ITEM, SOMEHOW THIS MESSED UP GIVING
    // TypeError: data[Symbol.iterator] is not a function error

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return JSON.stringify({ title: obj.title, category: obj.category, stories: [] })
        }
        for (var news of data) {
            var newsObj = {}
            // console.log(news)
            newsObj.title = news['title']
            newsObj.published_at = new Date(news['pubDate'])
            // the image is quite embedded...
            if (news['media:group'] &&
                news['media:group']['media:content'] &&
                news['media:group']['media:content'][0] &&
                news['media:group']['media:content'][0]['url']) {
                    newsObj.thumbnail = news['media:group']['media:content'][0]['url']
            } else {
                newsObj.thumbnail = 'http://placehold.it/250x200'
            }
            newsObj.url = news['link']
            // need to remove html from the description
            newsObj.description = news['content:encoded']
            newsObj.category = obj.category
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, category: obj.category, stories: newData })
    }
}
