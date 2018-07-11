module.exports = (body, api) => {
    if (body.post_type !== 'message') return;
    if (typeof(body.message) !== 'string') return;
    if (!body.message.startsWith('!apiList')) return;
    api.reply(body, `${api.apiList()}`);
}
