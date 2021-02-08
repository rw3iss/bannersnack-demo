import HttpClient from '../HttpClient';
import store from '../Store';

class UserService extends HttpClient {

    signup(email: string, password: string) {
        var query = `mutation Signup($email: String!, $password: String!) {
            signup(email: $email, password: $password) {
                success,
                message
            }
        }`

        return this.request(`/graphql`, 'POST', { query, variables: { email, password } })
        .then(r => {
            if (r.errors) {
                return Promise.reject(r.errors[0].message);
            }
            return Promise.resolve(r.data.signup)
        })
        .catch(e => {
            throw e;
        })
    }

    login(email: string, password: string) {  
        var query = `mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token,
                user { email }
            }
        }`

        return this.request(`/graphql`, 'POST', { query, variables: { email, password } })
        .then(r => {
            if (r.errors) {
                return Promise.reject(r.errors[0].message);
            }
            store.dispatch({ type: 'users/loggedIn', token: r.data.login.token })
            return Promise.resolve(true)
        })
        .catch(e => {
            throw e;
        })
    }

    forgotPassword(email: string) {     
        var query = `mutation ForgotPassword($email: String!) {
            forgotPassword(email: $email) {
                success, message
            }
        }`

        return this.request(`/graphql`, 'POST', { query, variables: { email } })
        .then(r => {
            if (r.errors) {
                return Promise.reject(r.errors[0].message);
            }
            //store.dispatch({ type: 'users/passwordReset', token: r.data.forgotPassword.token })
            return Promise.resolve(r.data.forgotPassword)
        })
        .catch(e => {
            throw e;
        })
    }

    resetPassword(resetToken: string, newPassword: string) {     
        var query = `mutation ResetPassword($resetToken: String!, $newPassword: String!) {
            resetPassword(resetToken: $resetToken, newPassword: $newPassword) {
                success, message
            }
        }`

        return this.request(`/graphql`, 'POST', { query, variables: { resetToken, newPassword } })
        .then(r => {
            if (r.errors) {
                return Promise.reject(r.errors[0].message);
            }
            return Promise.resolve(r.data.resetPassword)
        })
        .catch(e => {
            throw e;
        })
    }

}

const service = new UserService();
export default service;