import * as axios from 'axios';

const URL = process.env.NODE_ENV === 'production' ? 'http://member.concepters.co.kr' : 'http://192.168.0.8';

export default (method, url, data) => {
    return axios({
        method: method,
        url: URL + url,
        data: data
    })
}