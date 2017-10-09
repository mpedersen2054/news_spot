
let express = require('express'),
    port = process.env.PORT || 8080

let app = express()

app.get('/', (req, res) => {
    res.send('Hello there news_spot app!')
})

app.listen(port, () => console.log(`App running on port ${port}`))
