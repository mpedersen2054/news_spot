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

// new Newsmax()
//     .init()
//     .then(response => {
//         console.log('response from newsmax:')
//         console.log(response)
//     })
//     .catch(err => {
//         console.log('there was an error for newsmax!', err)
//     })

// new CNNNews()
//     .init()
//     .then(response => {
//         console.log('response from cnn:')
//         console.log(response)
//     })
//     .catch(err => {
//         console.log('there was an error for cnn!', err)
//     })

// new NewsBusters()
//     .init()
//     .then(response => {
//         console.log('response from news busters:')
//         console.log(response)
//     })
//     .catch(err => {
//         console.log('there was an error for news busters!', err)
//     })

new Politico()
    .init()
    .then(response => {
        console.log('response from politico:')
        console.log(response)
    })
    .catch(err => {
        console.log('there was an error for politico!', err)
    })
