const fs = require('fs');
const config = require('./../config');
const botApi = require('./botApi');

class Handles {
    constructor() {
        this.path = {
            code: `${config.handle.path.code}/`,
            default: `${config.handle.path.default}/`
        };
        this.handles = {};
    }

    init() {
        let defaultHandles = fs.readdirSync(this.path.default);
        defaultHandles.forEach(handleName => {
            let _ = handleName.substring(0, handleName.indexOf('.'));
            this.handles[_] = require(`${this.path.default}${_}`);
        });
        let codeHandles = fs.readdirSync(this.path.code);
        codeHandles.forEach(handleName => {
            try {
                this.update(handleName);
            } catch (e) {
                botApi.send(botApi.api.sendPrivateMsg, {
                    user_id: config.masterId,
                    message: `加载文件 ${handleName} 失败,错误 ${e}`
                })
            }
        });
    }

    update(handleName) {
        let _ = handleName.substring(0, handleName.indexOf('.'));
        this.handles[_] = require(`${this.path.code}${_}`);
    }

    delete(handleName) {
        let _ = handleName.substring(0, handleName.indexOf('.'));
        delete this.handles[_];
    }
}

let _ = new Handles();

module.exports = _;