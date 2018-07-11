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
    }
}

let _ = new Config();

module.exports = _;