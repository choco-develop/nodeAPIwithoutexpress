const http = require('http')
const fs = require('fs')
const url = require('url')
const figlet = require('figlet')



const PORT = process.env.PORT || 8000

// - [X] /singers -> Show the list of singers !
// - [ ] /singers?country=Ghana -> Show the list of singers from Ghana
// - [ ] /singers?name=P-Square -> Show the list of singers from Ghana



const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = new url.URLSearchParams(url.parse(req.url).query)
    if (page === '/') {
        res.statusCode = 403
        res.end('Use /singers endpoint please')
    } else if (page === '/singers') {
        if (params.toString() === '') {
            fs.readFile('./singers.json', 'utf8', (err, data) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data)
            })
        }
    } else {
        figlet('404!', (err, data) => {
            res.statusCode = 404
            res.end(data)
        })
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})