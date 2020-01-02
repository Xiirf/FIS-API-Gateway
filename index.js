const express = require('express')
const app = express()
const cors = require('cors');
const port = (process.env.PORT || 3005);
var router = require('./routers/router')
var bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Simple API Gateway")
})

app.use('/api/v1', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))