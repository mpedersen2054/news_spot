var ABCNews = require('./server/scrapers/abcnews')
var BBCNews = require('./server/scrapers/bbcnews')
var CBSNews = require('./server/scrapers/cbsnews')
var CNBCNews = require('./server/scrapers/cnbcnews')
var CNNNews = require('./server/scrapers/cnnnews')
var AtlanicNews = require('./server/scrapers/atlanticnews')
var BostonGlobe = require('./server/scrapers/bostonglobe')
var ChicagoSun = require('./server/scrapers/chicagosun')
var ChristianScience = require('./server/scrapers/christianscience')
var DailyCaller = require('./server/scrapers/dailycaller')
var DerSpiegel = require('./server/scrapers/derspiegel')
var EOnline = require('./server/scrapers/eonline')
var TheEconomist = require('./server/scrapers/theeconomist')
var FoxNews = require('./server/scrapers/foxnews')
var France24 = require('./server/scrapers/france24')
var FreeBeacon = require('./server/scrapers/freebeacon')
var TheHill = require('./server/scrapers/thehill')
var HuffPost = require('./server/scrapers/huffpost')
var Infowars = require('./server/scrapers/infowars')
var TheIntercept = require('./server/scrapers/theintercept')
var JPost = require('./server/scrapers/jpost')
var LATimes = require('./server/scrapers/latimes')
var NYDaily = require('./server/scrapers/nydaily')
var NYPost = require('./server/scrapers/nypost')
var NYTimes = require('./server/scrapers/nytimes')
var NewsBusters = require('./server/scrapers/newsbusters')
var Newsmax = require('./server/scrapers/newsmax')
var Politico = require('./server/scrapers/politico')
var RadarOnline = require('./server/scrapers/radaronline')
var RealClearPolitics = require('./server/scrapers/realclearpolitics')
var RollCall = require('./server/scrapers/rollcall')
var RollingStone = require('./server/scrapers/rollingstone')
var SkyNews = require('./server/scrapers/skynews')
var Times = require('./server/scrapers/times')
var TMZ = require('./server/scrapers/tmz')
var DailyMail = require('./server/scrapers/dailymail')
var ExpressNews = require('./server/scrapers/expressnews')
var TheIndependent = require('./server/scrapers/theindependent')
var TheSun = require('./server/scrapers/thesun')
var USNews = require('./server/scrapers/usnews')
var USAToday = require('./server/scrapers/usatoday')
var Variety = require('./server/scrapers/variety')
var WSJ = require('./server/scrapers/wsj')
var WashingtonExaminer = require('./server/scrapers/washingtonexaminer')
var WashingtonPost = require('./server/scrapers/washingtonpost')
var WashingtonTimes = require('./server/scrapers/washingtontimes')
var WeeklyStandard = require('./server/scrapers/weeklystandard')
var ZeroHedge = require('./server/scrapers/zerohedge')

var abcnew = new ABCNews()
abcnew.init().then(results => {
    // console.log('FROM ABC NEWS!')
    // console.log('==============')
    console.log('ABC LENGTH: ', results.length)
    var bbcnew = new BBCNews()
    bbcnew.init().then(resz => {
        var newarr = results.concat(resz)
        console.log('BBC LENGTH: ', resz.length)
        console.log(newarr.length)
    })
})

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

// var usatoday = new USAToday()
// usatoday.init((obj) => {
//     console.log('FROM The USAToday NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var variety = new Variety()
// variety.init((obj) => {
//     console.log('FROM The Variety NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var wsj = new WSJ()
// wsj.init((obj) => {
//     console.log('FROM The Wall Street Journal NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var washingtonexaminer = new WashingtonExaminer()
// washingtonexaminer.init((obj) => {
//     console.log('FROM The Washington Examiner NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var washpost = new WashingtonPost()
// washpost.init((obj) => {
//     console.log('FROM The Washington Post NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var washtimes = new WashingtonTimes()
// washtimes.init((obj) => {
//     console.log('FROM The Washington Times NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var weeklystandard = new WeeklyStandard()
// weeklystandard.init((obj) => {
//     console.log('FROM The Weekly Standard NEWS!')
//     console.log('==============')
//     console.log(obj)
// })

// var zerohedge = new ZeroHedge()
// zerohedge.init()
//     .then(data => {
//         console.log('HERES THE DATA!')
//         console.log(data)
//     })
//     .catch(err => {
//         console.log('THERE WAS AN ERROR!')
//         console.log(err)
//     })
