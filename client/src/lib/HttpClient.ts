import Request from './utils/Request';
const config = require('../config.json');

const API_BASE_URL = config.apiUrl;

export default class HttpClient {

    public request(url: string, method: string = 'GET', body: any = undefined): Promise<any> {
       return this._request(API_BASE_URL + url, method.toLowerCase(), body);
    }

    public externalRequest(url: string, method: string = 'GET', body: any = undefined): Promise<any> {
        return this._request(url, method.toLowerCase(), body);
    }

    // underlying Request wrapper
    private async _request(url: string, method: string = 'GET', body: any = undefined) {
        return new Promise((resolve, reject) => {
            let request;

            switch (method) {
                case 'get':
                    request = Request.get(url);
                    break;
                case 'post':
                    request = Request.post(url, body);
                    break;
                case 'put':
                    request = Request.put(url, body);
                    break;
                case 'delete':
                    request = Request.delete(url);
                    break;
                default:
                    request = Request.get(url);
                    break;
            }

            request
                .then(_r => _r.text())
                .then(text => {
                    return text ? JSON.parse(text) : {};
                })
                .then(_r => {
                    return resolve(_r);
                })
                .catch(e => {
                    return reject("Failed to make request.");
                });
        });

    }

}