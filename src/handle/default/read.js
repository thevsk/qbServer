const handlesEdit = require(`./../../core/handlesEdit`);

module.exports = (body, botApi) => {
    if (body.post_type !== 'message') return;
    if (typeof(body.message) !== 'string') return;
    if (!body.message.startsWith('!read')) return;
    let handleName = body.message.replace('!read', '').trim();
    try {
        if (handlesEdit.exists(handleName)) {
            botApi.reply(body, `${handlesEdit.read(handleName)}`);
        } else {
            botApi.reply(body, `函数 ${handleName} 不存在`);
        }
    } catch (e) {
        botApi.reply(body, `读取 ${handleName} 失败,错误 ${e}`);
    }
}