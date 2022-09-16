const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')

const PORT = process.env.PORT || 8000

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


app.get('/', (req, res) => {
    res.statusCode = 403
    res.send('Use /singers endpoint please')
})

app.get('/singers', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        fs.readFile('./singers.json', 'utf8', (err, data) => {
            if (err) { throw err }
            res.json(JSON.parse(data))
        })
    } else if (req.query.hasOwnProperty('country')) {
        fs.readFile('./singers.json', 'utf8', (err, data) => {
            if (err) { throw err }
            j = JSON.parse(data).filter((e) => e.country === req.query.country)
            res.json(j)
        })
    } else if (req.query.hasOwnProperty('name')) {
        fs.readFile('./singers.json', 'utf8', (err, data) => {
            if (err) { throw err }
            j = JSON.parse(data).filter((e) => e.name === req.query.name)
            res.json(j)
        })
    } else if (req.query.hasOwnProperty('songName')) {
        fs.readFile('./singers.json', 'utf8', (err, data) => {
            if (err) { throw err }
            j = JSON.parse(data).filter((e) => e.songName === req.query.songName)
            res.json(j)
        })
    } else {
        res.statusCode = 403
        res.send('Use correct parameters')
    }
})

app.post('/singers', (req, res) => {
    if (req.body.name && req.body.songName && req.body.country) {
        newEntry = [{ name: req.body.name, songName: req.body.songName, country: req.body.country }]
        fs.readFile('./singers.json', 'utf8', (err, data) => {
            if (err) { throw err }
            let newData = [...JSON.parse(data), newEntry[0]]
            fs.writeFile('./singers.json', JSON.stringify(newData), (err) => {
                if (err) { throw err }
                console.log('File overwritten');
            })
        })
        res.send('Wait for it')
    } else {
        res.status(503).send('Invalid request')
    }
})


app.listen(PORT, () => {
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})
