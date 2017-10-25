
let Outlet = require('../models').Outlet,
    Headline = require('../models').Headline,
    Story = require('../models').Story,
    response = require('../lib/createresponse')

module.exports = {
    index: (req, res) => {
        console.log(req.query)
        /*
        example:
        http://localhost:8080/api/v1/stories?categories[]=top&categories[]=science&categories[]=eu&keywords[]=trump&keywords[]=russia&keywords[]=hillary%20clinton&limit=10&offset=0&outlets[]=23&outlets[]=26&outlets[]=29&outlets[]=31&politicalLeaning=r&uploadedAt=today
        possibilities in req.query:
        @limit - 10
        @offset - 0
        @categories - [ str, str ]
        @outlets - [ id, id, id ]
        @politicalLeaning - 'l'
        @uploadedAt - 'str'
        */
    }
}
