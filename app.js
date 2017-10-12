
let express = require('express'),
    bodyParser = require('body-parser');

let app = express()
app.use(bodyParser.json())

// load in the routes
require('./server/config/routes')(app)

app.listen(8080, () => console.log(`App running on port 8080`))
