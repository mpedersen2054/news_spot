let assert = require('assert')
let NewsBusters = require('../../scrapers/newsbusters')
let expect = require('chai').expect
var obj, dataObj

describe('NewsBusters scraper', function() {

    before(function(done) {
        new NewsBusters().init(function(retObj) {
            obj = retObj
            done()
        })
    })

    it('should be an instance of NewsBusters', function() {
        expect(obj).to.be.an.instanceof(NewsBusters);
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


    describe('NewsBusters stories object', function() {
        before(function() {
            var parsed = obj.data.map(function(data) {
                return JSON.parse(data)
            })
            dataObj = parsed
        })

        it('should have atleast one story', function() {
            expect(dataObj[0].stories).to.have.lengthOf(dataObj[0].stories.length)
        })

        it('story data object should contain a title', function() {
            expect(dataObj[0].stories[0]).to.have.property('title').that.is.not.empty
        })

        it('story data object should contain a published_at', function() {
            expect(dataObj[0].stories[0]).to.have.property('published_at').that.is.not.empty
        })

        it('story data object should contain a thumbnail', function() {
            expect(dataObj[0].stories[0]).to.have.property('thumbnail').that.is.not.empty
        })

        it('story data object should contain a url', function() {
            expect(dataObj[0].stories[0]).to.have.property('url').that.is.not.empty
        })

        it('story data object should contain a description', function() {
            expect(dataObj[0].stories[0]).to.have.property('description').that.is.not.empty
        })

        it('story data object should contain a category', function() {
            expect(dataObj[0].stories[0]).to.have.property('category').that.is.not.empty
        })
    })

})
