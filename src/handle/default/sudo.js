const handlesEdit = require(`${__dirname}/../../core/handlesEdit`);

module.exports = (body, botApi) => {
    if (body.post_type !== 'message') return;
    if (!body.message.startWith('!sudo')) return;
}