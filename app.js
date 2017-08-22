var parser = require('xml2json')
var ABCNews = require('./scrapers/abcnews')
var BBCNews = require('./scrapers/bbcnews')

var abcnew = new ABCNews()
abcnew.init((obj) => {
    // console.log('FROM ABC NEWS!')
    // console.log('==============')
    // console.log(obj)
})

// var bbcnew = new BBCNews()
// bbcnew.init((obj) => {
//     console.log('FROM BBC NEWS!')
//     console.log('==============')
//     console.log(obj)
// })
