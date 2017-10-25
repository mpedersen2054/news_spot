
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

        // handle if uploadedAt and all its cases
        if ('uploadedAt' in rq) {
            sqlObj['where']['publishedAt'] = {
                $between: getDateRanges(rq['uploadedAt'])
            }
        }

        return Story.findAll(sqlObj)
            .then(data => {
                console.log(data.length)
                res.json(data.length)
            }).catch(err => console.log('error!', err))
    }
}
