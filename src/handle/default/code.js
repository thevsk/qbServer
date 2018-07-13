const handlesEdit = require(`./../../core/handlesEdit`);
const config = require('./../../config');

module.exports = (body, botApi) => {
    if (body.post_type !== 'message') return;
    if (typeof(body.message) !== 'string') return;
    if (!body.message.startsWith('!code')) return;
    if (typeof(body.user_id) !== 'number') return;
    if (body.user_id !== config.masterId) return;
    let array = body.message.split('\r\n');
    let handleName = array[0].replace('!code', '').trim();
    let code = '';
    for (let i = 0; i < array.length; i++) {
        if (i != 0) {
            code += `${array[i]}\r\n`;
        }
    }
    try {
        if (handlesEdit.exists(handleName)) {
            handlesEdit.update(code, handleName);
        } else {
            handlesEdit.add(code, handleName);
        }
        botApi.reply(body, `编码 ${handleName} 成功`);
    } catch (e) {
        botApi.reply(body, `编码 ${handleName} 失败,错误 ${e}`);
    }
}