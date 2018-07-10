const fs = require('fs');

class Handles {
    constructor() {
        this.path = {
            sudo: `${__dirname}/../handle/sudo/`,
            default: `${__dirname}/../handle/default/`
        };
        this.handles = {};
    }

    init() {
        let defaultHandles = fs.readdirSync(this.path.default);
        defaultHandles.forEach(handleName => {
            let _ = handleName.substring(0, handleName.indexOf('.'));
            this.handles[_] = require(`${this.path.default}${_}`);
        });
        let sudoHandles = fs.readdirSync(this.path.sudo);
        sudoHandles.forEach(handleName => {
            this.update(handleName);
        });
    }

    update(handleName) {
        let _ = handleName.substring(0, handleName.indexOf('.'));
        this.handles[_] = require(`${this.path.sudo}${_}`);
    }

    delete(handleName) {
        let _ = handleName.substring(0, handleName.indexOf('.'));
        delete this.handles[_];
    }
}

let _ = new Handles();

module.exports = _;