import * as axios from 'axios';

const URL =
    process.env.NODE_ENV === 'production'
        ? 'http://58.150.52.106:83'
        : 'http://192.168.0.8';

export default (method, url, data) => {
    return axios({
        method: method,
        url: URL + url,
        data: data
    });
};
