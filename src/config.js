class Config {
    constructor() {
        this.masterId = 2522534416;
        this.server = {
            host: '0.0.0.0',
            port: 7900
        };
        this.handle = {
            enable: true,
            path: {
                default: `${__dirname}/handle/default`,
                code: `${__dirname}/handle/code`
            }
        };
        this.api = {
            url: 'http://127.0.0.1:5700/',
            token: 'thevsk'
        }
    }
}

let _ = new Config();

module.exports = _;