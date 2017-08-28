var parser = require('xml2json')
var ABCNews = require('./scrapers/abcnews')
var BBCNews = require('./scrapers/bbcnews')
var CBSNews = require('./scrapers/cbsnews')
var CNBCNews = require('./scrapers/cnbcnews')
var CNNNews = require('./scrapers/cnnnews')

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

// var cbsnew = new CBSNews()
// cbsnew.init((obj) => {
//     console.log('FROM CBS NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var cnbcnew = new CNBCNews()
// cnbcnew.init((obj) => {
//     console.log('FROM CNBC NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

var cnnnew = new CNNNews()
cnnnew.init((obj) => {
    console.log('FROM CNN NEWS!')
    console.log('==============')
    console.log(obj)
})
