let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ABCNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_stories', url: 'http://abcnews.go.com/abcnews/topstories' },
            { title: 'international_headlines', url: 'http://abcnews.go.com/abcnews/internationalheadlines' },
            { title: 'us_headlines', url: 'http://abcnews.go.com/abcnews/usheadlines' },
            { title: 'politics_headlines', url: 'http://abcnews.go.com/abcnews/politicsheadlines' },
            { title: 'blotter_headlines', url: 'http://abcnews.go.com/abcnews/blotterheadlines' },
            { title: 'money_headlines', url: 'http://abcnews.go.com/abcnews/moneyheadlines' },
            { title: 'technology_headlines', url: 'http://abcnews.go.com/abcnews/technologyheadlines' },
            { title: 'health_headlines', url: 'http://abcnews.go.com/abcnews/healthheadlines' },
            { title: 'entertainment_headlines', url: 'http://abcnews.go.com/abcnews/entertainmentheadlines' },
            { title: 'travel_headlines', url: 'http://abcnews.go.com/abcnews/travelheadlines' },
            { title: 'sports_headlines', url: 'http://abcnews.go.com/abcnews/sportsheadlines' },
            { title: 'worldnews_headlines', url: 'http://abcnews.go.com/abcnews/worldnewsheadlines' },
            { title: '2020_headlines', url: 'http://abcnews.go.com/abcnews/2020headlines' },
            { title: 'primetime_headlines', url: 'http://abcnews.go.com/abcnews/primetimeheadlines' },
            { title: 'nighttime_headlines', url: 'http://abcnews.go.com/abcnews/nightlineheadlines' },
            { title: 'gma_headlines', url: 'http://abcnews.go.com/abcnews/gmaheadlines' }
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        for (var news of data) {
            var newsObj = {}
            newsObj.title = news['title']
            newsObj.thumbnail = news['media:thumbnail'][3]
            newsObj.url = news['link']
            newsObj.description = news['description']
            newsObj.category = news['category']
            // push the formatted data into newData[]
            newData.push(newsObj)
        }
        return JSON.stringify({ title: obj.title, stories: newData })
    }

}
