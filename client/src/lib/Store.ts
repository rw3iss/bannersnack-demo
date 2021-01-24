import { createStore } from 'redux';
import Auth from './Auth';

interface IState {
    token: string | undefined,
    items: []
}

function userStore(state: IState = { token: undefined, items: [] }, action: any) {

    switch (action.type) {
        case 'users/loggedIn':
            Auth.setToken(action.token);
            return { token: action.token }

        case 'items':
            return { items: state.items }

        case 'items/itemAdded':
            return { items: [...state.items, action.item ]}

        default:
            return state
    }
}

let store = createStore(userStore)

export default store;