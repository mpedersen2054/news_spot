var parser = require('xml2json')
var ABCNews = require('./scrapers/abcnews')

var ab = new ABCNews()
console.log(ab.urls)
