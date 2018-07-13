const http = require('http');
const botApi = require('./core/botApi');
const handles = require('./core/handles');
const config = require('./config');

let host, port, server;

let loadConfig = () => {
    host = config.server.host;
    port = config.server.port;
}

let init = () => {
    let onMessage = data => {
        console.log(data);
        for (let key in handles.handles) {
            try {
                handles.handles[key](JSON.parse(data), botApi);
            } catch (e) {
                botApi.send(botApi.api.sendPrivateMsg, {
                    user_id: config.masterId,
                    message: `执行函数 ${key} 失败，错误：${e}`
                });
            }
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
            user_id: config.masterId,
            message: `监听服务启动成功，端口 => ${port}`
        });
    });
}

handles.init();
loadConfig();
init();
start();