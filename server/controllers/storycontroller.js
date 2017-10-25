
let Outlet = require('../models').Outlet,
    Headline = require('../models').Headline,
    Story = require('../models').Story,
    response = require('../lib/createresponse'),
    Sequelize = require('sequelize'),
    getDateRanges = require('../lib/getDateRanges')

module.exports = {
    index: (req, res) => {
        const rq = req.query
        /*
        example:
        http://localhost:8080/api/v1/stories?categories[]=top&categories[]=science&categories[]=eu&keywords[]=trump&keywords[]=russia&keywords[]=hillary%20clinton&limit=10&offset=0&outlets[]=23&outlets[]=26&outlets[]=29&outlets[]=31&politicalLeaning=r&uploadedAt=today

        === POSSIBLITIES ===:
        @limit - 10
        @offset - 0
        @uploadedAt - 'str'
        @politicalLeaning - 'l'
        @outlets - [ id, id, id ]
        @categories - [ str, str ]
        */

        let sqlObj = {}
        // sqlObj['offset'] = rq.offset || 10
        // sqlObj['limit'] = rq.limit || 10
        sqlObj['where'] = {}
        // sqlObj['include'] = {}

        if ('uploadedAt' in rq) {
            sqlObj['where']['publishedAt'] = {
                $between: getDateRanges(rq['uploadedAt'])
            }
        }

        if ('politicalLeaning' in rq) {
            sqlObj['include'] = []
            let oInclude = {
                model: Outlet,
                where: {
                    leaning: rq['politicalLeaning']
                }
            }
            sqlObj['include'].push(oInclude)
        }

        if ('outlets' in rq) {
            sqlObj['include'] = sqlObj['include'] || []
            let oInclude = {
                model: Outlet,
                where: {
                    id: { $or: rq['outlets'] }
                }
            }
            sqlObj['include'].push(oInclude)
        }

        if ('categories' in rq) {
            sqlObj['include'] = sqlObj['include'] || []
            let cInclude = {
                model: Headline,
                where: {
                    category: { $or: rq['categories'] }
                }
            }
            sqlObj['include'].push(cInclude)
        }

        // this isnt necessary correct, it gives me all, for ex,
        // trump & russia stories, but excludes the ones where
        // trump and russia are in the same title
        if ('keywords' in rq) {
            let formattedKw = rq['keywords'].map(kw => {
                return { $like: `%${kw}%` }
            })
            sqlObj['where']['title'] = {
                $or: formattedKw
            }
        }

        // 1638 - total
        // 1425 - trump
        // 248 - russia
        // add them idv - 1673
        // contains trump & russia in same - 35

        return Story.findAll(sqlObj)
            .then(data => {
                console.log(data.length)
                res.json(data.length)
            }).catch(err => console.log('error!', err))
    }
}
