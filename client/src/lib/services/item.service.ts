import HttpClient from '../HttpClient';
import store from '../Store';
import { TItem } from '../models/Item';

class ItemService extends HttpClient {

    getItems(limit: number) {  
        var query = `query GetItems($limit: Int) {
            getItems(limit: $limit) {
                id, title, createdAt, userEmail
            }
        }`

        return this.request(`/graphql`, 'POST', { query, variables: { limit } })
        .then(r => {
            //store.dispatch({ type: 'items/getItems', items: r.data.getItems })
            return Promise.resolve(r.data.getItems)
        })
        .catch(e => {
            throw e;
        })
    }

    addItem(item: TItem) {
        var query = `mutation AddItem($title: String!) {
            addItem(title: $title) {
                id, title, createdAt, userEmail
            }
        }`

        return this.request(`/graphql`, 'POST', { query, variables: { title: item.title } })
        .then(r => {
            store.dispatch({ type: 'items/itemAdded', item: r.data.addItem })
            return Promise.resolve(r.data.addItem)
        })
        .catch(e => {
            throw e;
        })
    }

}

const service = new ItemService();
export default service;