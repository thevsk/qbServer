const handlesEdit = require(`./../../core/handlesEdit`);

module.exports = (body, botApi) => {
    if (body.post_type !== 'message') return;
    if (typeof(body.message) !== 'string') return;
    if (!body.message.startsWith('!delete')) return;
    let handleName = body.message.replace('!delete', '').trim();
    try {
        if (handlesEdit.exists(handleName)) {
            handlesEdit.delete(handleName);
            botApi.reply(body, `删除 ${handleName} 成功`);
        } else {
            botApi.reply(body, `函数 ${handleName} 不存在`);
        }
    } catch (e) {
        botApi.reply(body, `删除 ${handleName} 失败,错误 ${e}`);
    }
}