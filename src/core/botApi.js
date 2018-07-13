const httpRequest = require('request');
const config = require('./../config');

class BotApi {
    constructor() {
        this.url = config.api.url;
        this.token = config.api.token;
        this.api = {
            sendPrivateMsg: "send_private_msg",
            sendGroupMsg: "send_group_msg",
            sendDiscussMsg: "send_discuss_msg",
            sendMsg: "send_msg",
            deleteMsg: "delete_msg",
            sendLike: "send_like",
            setGroupKick: "set_group_kick",
            setGroupBan: "set_group_ban",
            setGroupAnonymousBan: "set_group_anonymous_ban",
            setGroupWholeBan: "set_group_whole_ban",
            setGroupAdmin: "set_group_admin",
            setGroupAnonymous: "set_group_anonymous",
            setGroupCard: "set_group_card",
            setGroupLeave: "set_group_leave",
            setGroupSpecialTitle: "set_group_special_title",
            setDiscussLeave: "set_discuss_leave",
            setFriendAddRequest: "set_friend_add_request",
            setGroupAddRequest: "set_group_add_request",
            getLoginInfo: "get_login_info",
            getStrangerInfo: "get_stranger_info",
            getGroupList: "get_group_list",
            getGroupMemberInfo: "get_group_member_info",
            getGroupMemberList: "get_group_member_list",
            getStatus: "get_status",
            cleanDataDir: "clean_data_dir",
            getFriendList: "_get_friend_list",
            getGroupInfo: "_get_group_info"
        };
    }

    apiList() {
        let result = '';
        for (let key in this.api) {
            result += key;
            result += '\r\n';
        }
        return result;
    }

    reply(body, message) {
        if (typeof(body.message_type) === 'string') {
            this.send(this.api.sendMsg, {
                message_type: body.message_type,
                user_id: body.user_id,
                group_id: body.group_id,
                discuss_id: body.discuss_id,
                message: message
            });
        } else if (typeof(body.group_id) !== 'undefined') {
            this.send(this.api.sendGroupMsg, {
                group_id: body.group_id,
                message: message
            });
        }
    }

    send() {
        let url, data, callback, options;
        url = arguments[0];
        if (typeof(arguments[1]) !== 'undefined') {
            if (typeof(arguments[1]) === 'object') {
                data = arguments[1];
            } else if (typeof(arguments[1]) === 'function') {
                callback = arguments[1];
            }
            if (typeof(arguments[2]) === 'function') {
                callback = arguments[2];
            }
        }
        options = {
            url: this.url + url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (this.token !== undefined && this.token !== null && this.token !== '') {
            options.headers['Authorization'] = 'Token ' + this.token;
        }
        console.log(`调用API：${JSON.stringify(options)}`);
        if (data) {
            console.log(`参数：${JSON.stringify(data)}`);
            options.body = JSON.stringify(data);
        }
        httpRequest(options, (error, response, body) => {
            if (error) {
                console.log(`调用API错误：${error}`);
                return;
            }
            console.log(`收到API的返回值 => 状态码: ${response.statusCode} 响应头: ${JSON.stringify(response.headers)} 正文：${body}`);
            if (callback) {
                callback(body);
            }
        });
    }
};

let _ = new BotApi();

module.exports = _;