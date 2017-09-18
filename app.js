var parser = require('xml2json')
var ABCNews = require('./scrapers/abcnews')
var BBCNews = require('./scrapers/bbcnews')
var CBSNews = require('./scrapers/cbsnews')
var CNBCNews = require('./scrapers/cnbcnews')
var CNNNews = require('./scrapers/cnnnews')
var AtlanicNews = require('./scrapers/atlanticnews')
var BostonGlobe = require('./scrapers/bostonglobe')
var ChicagoSun = require('./scrapers/chicagosun')
var ChristianScience = require('./scrapers/christianscience')
var DailyCaller = require('./scrapers/dailycaller')
var DerSpiegel = require('./scrapers/derspiegel')
var EOnline = require('./scrapers/eonline')
var TheEconomist = require('./scrapers/theeconomist')

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

// var cnnnew = new CNNNews()
// cnnnew.init((obj) => {
//     console.log('FROM CNN NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var atlanticnew = new AtlanicNews()
// atlanticnew.init((obj) => {
//     console.log('FROM The Atlantic NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// NEED TO COME BACK AND MAKE SURE I WORK
// var bostonglobe = new BostonGlobe()
// bostonglobe.init((obj) => {
//     console.log('FROM The boston globe NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var chicagosun = new ChicagoSun()
// chicagosun.init((obj) => {
//     console.log('FROM The chicago sun NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var christianscience = new ChristianScience()
// christianscience.init((obj) => {
//     console.log('FROM The Christian Science Monitor NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var dailycaller = new DailyCaller()
// dailycaller.init((obj) => {
//     console.log('FROM The Daily Caller NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var derspiegel = new DerSpiegel()
// derspiegel.init((obj) => {
//     console.log('FROM Der Spiegel NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var eonline = new EOnline()
// eonline.init((obj) => {
//     console.log('FROM E Online NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

var theeconomist = new TheEconomist()
theeconomist.init((obj) => {
    console.log('FROM The Economist NEWS!')
    console.log('==============')
    console.log(obj)
})
