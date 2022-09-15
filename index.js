const http = require('http')
const fs = require('fs')
const url = require('url')



// Url {
//     protocol: null,
//         slashes: null,
//             auth: null,
//                 host: null,
//                     port: null,
//                         hostname: null,
//                             hash: null,
//                                 search: null,
//                                     query: null,
//                                         pathname: '/singers',
//                                             path: '/singers',
//                                                 href: '/singers'
// }

const PORT = process.env.PORT || 8000

// /singers -> Show the list of singers
// /singers?country=Ghana -> Show the list of singers from Ghana
// /singers?name=P-Square -> Show the list of singers from Ghana


const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = new url.URLSearchParams(url.parse(req.url).query)
    if (page === '/') {
        res.statusCode = 403
        res.end('Use /singers endpoint please')
    }
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})