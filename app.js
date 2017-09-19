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
var NYDaily = require('./scrapers/nydaily')
var NYPost = require('./scrapers/nypost')
var NYTimes = require('./scrapers/nytimes')
var NewsBusters = require('./scrapers/newsbusters')
var Newsmax = require('./scrapers/newsmax')
var Politico = require('./scrapers/politico')
var RadarOnline = require('./scrapers/radaronline')
var RealClearPolitics = require('./scrapers/realclearpolitics')
var RollCall = require('./scrapers/rollcall')
var RollingStone = require('./scrapers/rollingstone')
var SkyNews = require('./scrapers/skynews')
var Times = require('./scrapers/times')
var TMZ = require('./scrapers/tmz')
var DailyMail = require('./scrapers/dailymail')
var ExpressNews = require('./scrapers/expressnews')
var TheIndependent = require('./scrapers/theindependent')
var TheSun = require('./scrapers/thesun')
var USNews = require('./scrapers/usnews')
var USAToday = require('./scrapers/usatoday')

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

// var latimes = new LATimes()
// latimes.init((obj) => {
//     console.log('FROM The LA Times NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var nydaily = new NYDaily()
// nydaily.init((obj) => {
//     console.log('FROM The New York Daily NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var nypost = new NYPost()
// nypost.init((obj) => {
//     console.log('FROM The New York Post NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var nytimes = new NYTimes()
// nytimes.init((obj) => {
//     console.log('FROM The New York Times NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var newsbusters = new NewsBusters()
// newsbusters.init((obj) => {
//     console.log('FROM News Busters NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var newsmax = new Newsmax()
// newsmax.init((obj) => {
//     console.log('FROM Newsmax NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var politico = new Politico()
// politico.init((obj) => {
//     console.log('FROM Politico NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var radar = new RadarOnline()
// radar.init((obj) => {
//     console.log('FROM Radar Online NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var rcp = new RealClearPolitics()
// rcp.init((obj) => {
//     console.log('FROM Real Clear Poltics NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var rollcall = new RollCall()
// rollcall.init((obj) => {
//     console.log('FROM Roll Call NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var rollingstone = new RollingStone()
// rollingstone.init((obj) => {
//     console.log('FROM RollingStone NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var skynews = new SkyNews()
// skynews.init((obj) => {
//     console.log('FROM Sky NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var times = new Times()
// times.init((obj) => {
//     console.log('FROM Times NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var tmz = new TMZ()
// tmz.init((obj) => {
//     console.log('FROM TMZ NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var dailymail = new DailyMail()
// dailymail.init((obj) => {
//     console.log('FROM Daily Mail NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var expressnews = new ExpressNews()
// expressnews.init((obj) => {
//     console.log('FROM Express UK NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var theindependent = new TheIndependent()
// theindependent.init((obj) => {
//     console.log('FROM The Independent NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var thesun = new TheSun()
// thesun.init((obj) => {
//     console.log('FROM The Sun NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var usnews = new USNews()
// usnews.init((obj) => {
//     console.log('FROM The US NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

var usatoday = new USAToday()
usatoday.init((obj) => {
    console.log('FROM The USAToday NEWS!')
    console.log('==============')
    console.log(obj)
})
