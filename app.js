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
var FoxNews = require('./scrapers/foxnews')
var France24 = require('./scrapers/france24')
var FreeBeacon = require('./scrapers/freebeacon')
var TheHill = require('./scrapers/thehill')
var HuffPost = require('./scrapers/huffpost')
var Infowars = require('./scrapers/infowars')
var TheIntercept = require('./scrapers/theintercept')
var JPost = require('./scrapers/jpost')
var LATimes = require('./scrapers/latimes')

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

// var theeconomist = new TheEconomist()
// theeconomist.init((obj) => {
//     console.log('FROM The Economist NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var foxnews = new FoxNews()
// foxnews.init((obj) => {
//     console.log('FROM Fox News NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var france24 = new France24()
// france24.init((obj) => {
//     console.log('FROM France 24 NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var freebeacon = new FreeBeacon()
// freebeacon.init((obj) => {
//     console.log('FROM Free Beacon NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var thehill = new TheHill()
// thehill.init((obj) => {
//     console.log('FROM The Hill NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var huffpost = new HuffPost()
// huffpost.init((obj) => {
//     console.log('FROM The Huffington Post NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var infowars = new Infowars()
// infowars.init((obj) => {
//     console.log('FROM Infowars NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var theintercept = new TheIntercept()
// theintercept.init((obj) => {
//     console.log('FROM The Intercept NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var jpost = new JPost()
// jpost.init((obj) => {
//     console.log('FROM The Jerusalem NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

var latimes = new LATimes()
latimes.init((obj) => {
    console.log('FROM The LA Times NEWS!')
    console.log('==============')
    console.log(obj)
})
