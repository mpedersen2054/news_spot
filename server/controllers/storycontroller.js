
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
        sqlObj['where'] = {}
        sqlObj['include'] = []

        sqlObj['offset'] = 0
        sqlObj['limit'] = 5

        if ('uploadedAt' in rq) {
            sqlObj['where']['publishedAt'] = {
                $between: getDateRanges(rq['uploadedAt'])
            }
        }

        if ('politicalLeaning' in rq) {
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
            // if Outlet is already in include dont add another
            // insted just add a key/value to exists where: { ... }
            if (sqlObj['include'].length > 0) {
                sqlObj['include'][0]['where']['id'] = { $or: rq['outlets'] }
            } else {
                sqlObj['include'].push(oInclude)
            }
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
        // might want to add (inclusive/excluse) keywords selection
        if ('keywords' in rq) {
            let formattedKw = rq['keywords'].map(kw => {
                return { $like: `%${kw}%` }
            })
            sqlObj['where']['title'] = {
                $or: formattedKw
            }
        }

        // add 'as' into each include object
        // if they are both in there, just add 'as' to each
        if (sqlObj['include'].length === 2) {
            for (incl of sqlObj['include']) {
                if (incl['model'] == Outlet) {
                    incl['as'] = 'storyOutlet'
                }
                if (incl['model'] == Headline) {
                    incl['as'] = 'storyHeadline'
                }
            }
        }
        // if there is only 1, add the 'as' and add
        // the Model that is not included
        else if (sqlObj['include'].length === 1) {
            let incl = storyObj['include'][0]
            if (incl['model'] == Outlet) {
                incl['as'] = 'storyOutlet'
                sqlObj['include'].push({
                    model: Headline,
                    as: 'storyHeadline'
                })
            }
            if (incl['model'] == Headline) {
                incl['as'] = 'storyHeadline'
                sqlObj['include'].push({
                    model: Outlet,
                    as: 'storyOutlet'
                })
            }
        }
        // if nothing in 'include', add each
        // model along with corresponding 'as'
        else {
            sqlObj['include'].push(
                {
                    model: Headline,
                    as: 'storyHeadline'
                },
                {
                    model: Outlet,
                    as: 'storyOutlet'
                }
            )
        }

        return Story.findAll(sqlObj)
            .then(data => {
                // eventually use the response_creator
                console.log(JSON.stringify(data))
                res.status(200).json(data)
            }).catch(err => console.log('error!', err))
    }
}
