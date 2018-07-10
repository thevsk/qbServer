const fs = require('fs');
const http = require('http');

let config, host = '0.0.0.0', port = 7900, server;

let init = () => {
    try {
        config = fs.readFileSync(`${__dirname}/resources/config.json`);
        config = JSON.parse(config);
        host = config.host;
        port = config.port;
    } catch (e) {
        console.log(`read config.json fail`);
    }
    
    let onMessage = data => {
        console.log(data);
    }
    
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
    
    server.listen({
        host: host,
        port: port
    }, () => {
        console.log(`listen host => ${host}, port => ${port}`);
    });
}

init();