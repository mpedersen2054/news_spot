let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

let app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'client', 'public')))
// app.use(express.static(path.join(__dirname, 'node_modules')))

require('./server/config/routes')(app)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})

app.listen(8080, () => console.log(`App running on port 8080`))
