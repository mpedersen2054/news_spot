let assert = require('assert'),
    DerSpiegel = require('../../scrapers/derspiegel'),
    expect = require('chai').expect,
    dataObj

describe('DerSpiegel scraper', function() {
    before(function(done) {
        new DerSpiegel().init().then(retObj => {
            dataObj = retObj
            done()
        })
    })

    describe('DerSpiegel stories object', function() {

        it('should have atleast one story', function() {
            expect(dataObj).to.have.lengthOf(dataObj.length)
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
