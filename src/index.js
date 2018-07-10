const fs = require('fs');
const http = require('http');

let host = '0.0.0.0', port = 7900, server;

let loadConfig = () => {
    try {
        let config = JSON.parse(fs.readFileSync(`${__dirname}/resources/config.json`));
        host = config.host;
        port = config.port;
    } catch (e) {
        console.log(`read config.json fail`);
    }
}

let init = () => {
    let onMessage = data => {
        console.log(data);
    };
    server = http.createServer();
    server.on('request', (req, res) => {
        console.log(req.headers);
        let data = [];
        req.on('data', chunk => {
            data.push(chunk);
        });
        req.on('end', () => {
            onMessage(data.join(''));
            res.statusCode = 204;
            res.end();
        });
    });
}

let start = () => {
    server.listen({
        host: host,
        port: port
    }, () => {
        console.log(`listen host => ${host}, port => ${port}`);
    });
}

loadConfig();
init();
start();