import * as axios from 'axios';

const URL =
    process.env.NODE_ENV === 'production'
        ? 'http://api.member.concepters.co.kr:83'
        : 'http://192.168.0.8';

export default (method, url, data) => {
    return axios({
        method,
        url: URL + url,
        data,
        withCredentials: true
    });
};
