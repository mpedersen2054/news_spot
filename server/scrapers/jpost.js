let Scraper = require('./base')

module.exports = class JPost extends Scraper {
    constructor(urls) {
        super()
        this.name = 'The Jerusalem Post'
        this.leaning = 'i'
        this.website = 'http://www.jpost.com/'
        this.urls = [
            { title: 'top_news', url: 'http://www.jpost.com/Rss/RssFeedsFrontPage.aspx', category: 'top' },
            { title: 'green_news', url: 'http://www.jpost.com/Rss/RssFeedsGreenIsrael.aspx', category: 'environment' },
            { title: 'innovation_news', url: 'http://www.jpost.com/Rss/RssFeedsInnovativeResearch.aspx', category: 'science' },
            { title: 'israel_news', url: 'http://www.jpost.com/Rss/RssFeedsIsraelNews.aspx', category: 'me' },
            { title: 'sports_news', url: 'http://www.jpost.com/Rss/RssFeedsSports.aspx', category: 'sports' },
            { title: 'diplomacy_news', url: 'http://www.jpost.com/Rss/RssFeedsPoliticsDiplomacy.aspx', category: 'politics' },
            { title: 'middleeast_news', url: 'http://www.jpost.com/Rss/RssFeedsMiddleEastNews.aspx', category: 'me' },
            { title: 'iran_news', url: 'http://www.jpost.com/Rss/RssFeedsIran', category: 'me' },
            { title: 'isis_news', url: 'http://www.jpost.com/Rss/RssFeedsISISThreat', category: 'me' },
            { title: 'opinion_news', url: 'http://www.jpost.com/Rss/RssFeedsOpinion.aspx', category: 'misc' },
            { title: 'israel_conflict_news', url: 'http://www.jpost.com/Rss/RssFeedsArabIsraeliConflict.aspx', category: 'me' },
            { title: 'business_news', url: 'http://www.jpost.com/Rss/RssFeedsBusinessAndInnovation', category: 'economy' },
            { title: 'health_news', url: 'http://www.jpost.com/Rss/RssFeedsBusinessAndInnovationHealthAndScience', category: 'health' },
            { title: 'christian_news', url: 'http://www.jpost.com/Rss/RssFeedsChristianNews', category: 'misc' },
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
            // need to remove html from description
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
