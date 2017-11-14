let Scraper = require('./base')

module.exports = class Times extends Scraper {
    constructor(urls) {
        super()
        this.name = 'Time'
        this.leaning = 'l'
        this.website = 'http://time.com/'
        this.logo = 'https://i.imgur.com/ZeUQajT.png'
        this.urls = [
            { title: 'top_news', url: 'http://feeds2.feedburner.com/time/topstories', category: 'top' },
            { title: 'us_news', url: 'http://feeds2.feedburner.com/time/nation', category: 'us' },
            // COME BACK TO ME, ALL OF THE RSS TOPICS WERE SHOWING UP BLANK?
        ]
    }

    format(obj) {
        var js = JSON.parse(obj.data)
        var data = js.rss.channel.item
        var newData = []
        if (!data) {
            return []
        }
        if (typeof data != 'array') {
            data = [data]
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
            if (news['media:content'] && news['media:content']['url']) {
                newsObj.thumbnail = news['media:content']['url']
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
