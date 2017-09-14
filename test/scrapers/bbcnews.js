let assert = require('assert')
let BBCNews = require('../../scrapers/bbcnews')
let expect = require('chai').expect
var obj, dataObj

describe('BBCNews scraper', function() {

    before(function(done) {
        new BBCNews().init(function(retObj) {
            obj = retObj
            done()
        })
    })

    it('should be an instance of BBCNews', function() {
        expect(obj).to.be.an.instanceof(BBCNews);
    })

    it('should have a urls property that is not empty', function() {
        expect(obj.urls).to.be.an('array').that.is.not.empty
    })

    it('should have a data property that is not empty', function() {
        expect(obj.data).to.be.an('array').that.is.not.empty
    })

    it('data property should have equal number of objects to urls', function() {
        expect(obj.urls.length).to.equal(obj.data.length)
    })


    describe('BBCNews stories object', function() {
        before(function() {
            var parsed = obj.data.map(function(data) {
                return JSON.parse(data)
            })
            dataObj = parsed
        })

        it('should have atleast one story', function() {
            expect(dataObj[0].stories).to.have.lengthOf(dataObj[0].stories.length)
        })

        it('data object should contain a title', function() {
            expect(dataObj[0].stories[0]).to.have.property('title').that.is.not.empty
        })

        it('story data object should contain a published_at', function() {
            expect(dataObj[0].stories[0]).to.have.property('published_at').that.is.not.empty
        })

        it('data object should contain a thumbnail', function() {
            expect(dataObj[0].stories[0]).to.have.property('thumbnail').that.is.not.empty
        })

        it('data object should contain a url', function() {
            expect(dataObj[0].stories[0]).to.have.property('url').that.is.not.empty
        })

        it('data object should contain a description', function() {
            expect(dataObj[0].stories[0]).to.have.property('description').that.is.not.empty
        })

        it('data object should contain a category', function() {
            expect(dataObj[0].stories[0]).to.have.property('category').that.is.not.empty
        })
    })

})
