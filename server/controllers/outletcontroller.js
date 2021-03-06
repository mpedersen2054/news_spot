
let Outlet = require('../models').Outlet,
    Headline = require('../models').Headline,
    Story = require('../models').Story,
    response = require('../lib/createresponse')

module.exports = {
    index: (req, res) => {
        let rq = req.query,
            query
        if (rq.limit && rq.offset) {
            const limit  = Number(req.query.limit)
            const offset = Number(req.query.offset)
            query = {
                limit, offset,
                attributes: [ 'id', 'name', 'logo' ]
            }
        } else {
            query = {
                attributes: [ 'id', 'name', 'logo' ]
            }
        }
        return Outlet
            .findAll(query)
            .then(outlets => JSON.stringify(outlets))
            .then(outlets => JSON.parse(outlets))
            .then(outlets => {
                res.status(200).json(outlets)
            })
            .catch(err => res.status(404).json(err))
    },

    show: (req, res) => {
        return Outlet
            .findOne({
                where: { id: Number(req.params.id) },
                include: [ { model: Headline, as: 'outletHeadlines' } ]
            })
            // needed to remove the sequelize formatting
            .then(outlet => JSON.stringify(outlet))
            .then(outlet => JSON.parse(outlet))
            .then(outlet => {
                // outletHeadlineCategories is array of all unique headline cats
                outlet.outletHeadlineCategories = outlet.outletHeadlines
                    .map(headline => headline.category)
                    .filter((val, idx, arr) => arr.indexOf(val) === idx)
                return outlet
            })
            .then(outlet => {
                res.status(200).json(outlet)
            })
            .catch(err => res.status(400).json({ message: `Outlet ${req.params.id} does not exist` }))
    }
}
