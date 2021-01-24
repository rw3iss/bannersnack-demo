import Cookies from './utils/Cookies';

export default class Auth {

    static setToken(token) {
        Cookies.set('token', token);
    }

    static getToken() {
        return Cookies.get('token');
    }

    static isAuthenticated() {
        return Cookies.get('token') != null;
    }

    static logout() {
        return Cookies.delete('token');
    }

}