const express = require('express')
const app = express()

app.use(express.static('build'))
app.use(express.static('favicons'))
app.listen(process.env.PORT || 8080, () => console.log(`Listening on ${process.env.PORT || 8080}!`))
