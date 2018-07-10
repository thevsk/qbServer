const fs = require('fs');
const handles = require('./handles');

class HandlesEdit {
    constructor() {
        this.path = `${__dirname}/../handle/sudo/`;
    }

    exists(handleName) {
        return fs.existsSync(`${this.path}${handleName}.js`);
    }

    write(text, handleName) {
        fs.writeFileSync(`${this.path}${handleName}.js`, text, {
            encoding: 'utf8'
        });
    }

    add(text, handleName) {
        fs.openSync(`${this.path}${handleName}.js`, 'w');
        this.write(text, handleName);
        handles.update(`${handleName}.js`);
    }

    update(text, handleName) {
        this.write(text, handleName);
        handles.update(`${handleName}.js`);
    }

    delete(handleName) {
        handles.delete(`${handleName}.js`);
    }
}

let _ = new HandlesEdit();

module.exports = _;