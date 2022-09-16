const http = require('http')
const fs = require('fs')
const url = require('url')
const figlet = require('figlet')

const PORT = process.env.PORT || 8000

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
        } else if (params.get('country')) {
            fs.readFile('./singers.json', 'utf8', (err, data) => {
                if (err) throw err;
                j = JSON.parse(data).filter((e) => e.country === params.get('country'))
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(j))
            })
           
        } 
        else if(params.get('name')){
            fs.readFile('./singers.json', 'utf8', (err, data) => {
                if (err) throw err;
                j = JSON.parse(data).filter((e) => e.name === params.get('name'))
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(j))
            })
        }
        else if(params.get('songName')){
            fs.readFile('./singers.json', 'utf8', (err, data) => {
                if (err) throw err;
                j = JSON.parse(data).filter((e) => e.songName === params.get('songName'))
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(j))
            })
        }
        else if(params.get('album')){
            fs.readFile('./singer.json','utf8',(err,data) => {
                if (err) throw err;
                j=JSON.parse(data).filter((e)=>e.album===params.get('album'))
                res.writeHead(200,{ 'Content-Type': 'application/json' });
                res.end(JSON(j))
            })
        }
        else {
            res.statusCode = 403
            res.end('Use country parameters please')
        }
    } 
    else {
        figlet('404!', (err, data) => {
            res.statusCode = 404
            res.end(data)
        })
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
