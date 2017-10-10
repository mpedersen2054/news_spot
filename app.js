
let express = require('express'),
    port = 8080,
    app = express()

app.get('/', (req, res) => {
    res.send({
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        dbname: process.env.PROD_DB_NAME,
        hostname: process.env.PROD_DB_HOSTNAME,
        port:process.env.PROD_DB_PORT,
    })
})

app.listen(port, () => console.log(`App running on port ${port}`))
