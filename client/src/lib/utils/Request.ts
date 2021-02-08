import Cookies from './Cookies';

const _getAccessToken = () => Cookies.get('token');

// adds Authorization header with JWT token, etc...
function _makeRequestOptions(opts: any = undefined) {
    let options = opts || {};

    let token = _getAccessToken();
    if (token) {
        if (!options.headers) {
            options.headers = {};
        }
        options.headers["Authorization"] = `Bearer ${token}`;
    }

    return options;
}

export default class Request {
    
    static async get(url: string) {
        let opts = {
            mode: 'cors',
            method: 'GET',
            //credentials: 'include'
        };
        opts = _makeRequestOptions(opts)
        return fetch(url, (opts as any));
    }

    static async post(url: string, data: any, headers = {}) {
        let opts = {
            mode: 'cors',
            body: data ? JSON.stringify(data) : undefined,
            method: 'POST',
            //credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };
        opts = _makeRequestOptions(opts)

        return fetch(url, (opts as any));
    }

    static async put(url: string, jsonData: any) {
        let opts = {
            mode: 'cors',
            body: jsonData ? JSON.stringify(jsonData) : undefined,
            method: 'PUT',
            //credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        opts = _makeRequestOptions(opts)
        return fetch(url, (opts as any));
    }

    static async delete(url: string) {
        let opts = {
            method: 'DELETE'
        };
        opts = _makeRequestOptions(opts)
        return fetch(url, opts);
    }
    
    // Helper to extract error messaging from responses
    static findError(res: any): string {
        return res ? (res.error ? res.error : (res.message ? res.message : 'An unknown error occurred.')) : 'An unknown error occurred.';
    }

}
