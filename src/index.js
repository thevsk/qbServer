const http = require('http');
const botApi = require('./core/botApi');
const handles = require('./core/handles');

let host, port, server;

let loadConfig = () => {
    host = '0.0.0.0';
    port = 7900;
}

let init = () => {
    let onMessage = data => {
        console.log(data);
        for (let key in handles.handles) {
            handles.handles[key](JSON.parse(data), botApi);
        }
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
        botApi.send(botApi.api.sendPrivateMsg, {
            user_id: 2522534416,
            message: `启动成功，端口 => ${port}`
        });
    });
}

handles.init();
loadConfig();
init();
start();