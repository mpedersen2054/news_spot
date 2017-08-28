var parser = require('xml2json')
var ABCNews = require('./scrapers/abcnews')
var BBCNews = require('./scrapers/bbcnews')
var CBSNews = require('./scrapers/cbsnews')

// var abcnew = new ABCNews()
// abcnew.init((obj) => {
    // console.log('FROM ABC NEWS!')
    // console.log('==============')
    // console.log(obj)
// })

// var bbcnew = new BBCNews()
// bbcnew.init((obj) => {
    // console.log('FROM BBC NEWS!')
    // console.log('==============')
    // console.log(obj)
// })

var cbsnew = new CBSNews()
cbsnew.init((obj) => {
    console.log('FROM CBS NEWS!')
    console.log('==============')
    console.log(obj)
})
