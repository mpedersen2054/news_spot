let assert = require('assert'),
    ABCNews = require('../../scrapers/abcnews'),
    expect = require('chai').expect,
    dataObj

describe('ABCNews scraper', function() {
    before(function(done) {
        new ABCNews().init().then(retObj => {
            // flatten
            dataObj = retObj.reduce(function(a, b) {
                return a.concat(b)
            })
            done()
        })
    })

    describe('ABCNews stories object', function() {

        it('should have atleast one story', function() {
            console.log(dataObj)
            expect(dataObj).to.have.lengthOf(dataObj[0].stories.length)
        })

        it('story data object should contain a title', function() {
            expect(dataObj[0]).to.have.property('title').that.is.not.empty
        })

        it('story data object should contain a published_at', function() {
            expect(dataObj[0]).to.have.property('published_at').to.exist
        })

        it('story data object should contain a thumbnail', function() {
            expect(dataObj[0]).to.have.property('thumbnail').that.is.not.empty
        })

        it('story data object should contain a url', function() {
            expect(dataObj[0]).to.have.property('url').that.is.not.empty
        })

        it('story data object should contain a description', function() {
            expect(dataObj[0]).to.have.property('description').that.is.not.empty
        })

        it('story data object should contain a category', function() {
            expect(dataObj[0]).to.have.property('category').that.is.not.empty
        })

        it('story data object should contain a headline', function() {
            expect(dataObj[0]).to.have.property('headline').that.is.not.empty
        })
    })

})
