module.exports = (body, api) => {
    if (body.post_type !== 'message') return;
    if (typeof(body.message) !== 'string') return;
    if (!body.message.startsWith('!rename')) return;
    let name = body.message.replace('!rename', '').trim();
    api.send(api.api.setGroupCard, {
        group_id: body.group_id,
        user_id: body.self_id,
        card: name
    }, result => {
        api.reply(body, result);
    });
}
