let axios = require('axios')
let parser = require('xml2json')
let Scraper = require('./base')

module.exports = class ABCNews extends Scraper {
    constructor(urls) {
        super()
        this.urls = [
            { title: 'top_stories', url: 'http://abcnews.go.com/abcnews/topstories', category: 'top' },
            { title: 'international_headlines', url: 'http://abcnews.go.com/abcnews/internationalheadlines', category: 'international' },
            { title: 'us_headlines', url: 'http://abcnews.go.com/abcnews/usheadlines', category: 'us' },
            { title: 'politics_headlines', url: 'http://abcnews.go.com/abcnews/politicsheadlines', category: 'politics' },
            { title: 'blotter_headlines', url: 'http://abcnews.go.com/abcnews/blotterheadlines', category: 'misc' },
            { title: 'money_headlines', url: 'http://abcnews.go.com/abcnews/moneyheadlines', category: 'economy' },
            { title: 'technology_headlines', url: 'http://abcnews.go.com/abcnews/technologyheadlines', category: 'technology' },
            { title: 'health_headlines', url: 'http://abcnews.go.com/abcnews/healthheadlines', category: 'health' },
            { title: 'entertainment_headlines', url: 'http://abcnews.go.com/abcnews/entertainmentheadlines', category: 'entertainment' },
            { title: 'travel_headlines', url: 'http://abcnews.go.com/abcnews/travelheadlines', category: 'travel' },
            { title: 'sports_headlines', url: 'http://abcnews.go.com/abcnews/sportsheadlines', category: 'sports' },
            { title: 'worldnews_headlines', url: 'http://abcnews.go.com/abcnews/worldnewsheadlines', category: 'international' },
            { title: '2020_headlines', url: 'http://abcnews.go.com/abcnews/2020headlines', category: 'politics' },
            { title: 'primetime_headlines', url: 'http://abcnews.go.com/abcnews/primetimeheadlines', category: 'misc' },
            { title: 'nighttime_headlines', url: 'http://abcnews.go.com/abcnews/nightlineheadlines', category: 'misc' },
            { title: 'gma_headlines', url: 'http://abcnews.go.com/abcnews/gmaheadlines', category: 'entertainment' }
        ]
    }
}
