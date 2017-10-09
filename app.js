
let express = require('express'),
    port = 8080,
    app = express()

app.get('/', (req, res) => {
    res.send('Hello there news_spot app!')
})

app.listen(port, () => console.log(`App running on port ${port}`))
