import * as axios from 'axios';

const URL = '192.168.0.31:86';

export default (method, url, data, headers) => {
    return axios({
        method,
        url: URL + url,
        data,
        headers,
        withCredentials: true
    });
};
