import React, { useState, useEffect } from 'react';
import FormInputRow from '../shared/FormInputRow';
import Auth from '../../lib/Auth';
import ItemService from '../../lib/services/item.service';
import { TItem } from '../../lib/models/Item';
import './style.scss';

function ItemRow({item}) {
    return (
        <li className="row">
            <div className="col id">{item.id}</div>
            <div className="col title">{item.title}</div>
            <div className="col created-by">{item.userEmail}</div>
            <div className="col created-at">{item.createdAt}</div>
        </li>
    )
}

export default function Dashboard({history}) {

    const [items, setItems] = useState([]) 
    const [newItem, setNewItem] = useState<Partial<TItem>>({});
    const [isAddingItem, setIsAddingItem] = useState(false) 
    const [error, setError] = useState('')
    
    useEffect(() => {
        if (!Auth.isAuthenticated()) {
            return history.push('/login');
        }

        ItemService.getItems(50)
        .then((items) => {
            setItems(items);
        });
    }, [history]);

    function addNewItem() {
        ItemService.addItem(newItem as TItem)
        .then((item: any) => {
            setItems([ item, ...items ]);
        })
        .catch(e => {
            setError(e);
        });
    }

	return (
		<div id="dashboard" className="page">

            <div className="inner">

                <h2 className="header">Dashboard</h2>
                
                <div className="actions">
                    <div className="button" onClick={(e) => setIsAddingItem(true)}>Add New Item</div>
                </div>

                { isAddingItem && 
                    <div className="add-item">

                        <div className="panel md">

                            <div className="header">Add new Item</div>

                            <div className="inner">
                    
                                <FormInputRow label="Title:" onChange={(e) => setNewItem({ title: e.target.value })} />

                                <div className="actions">
                                    <div className="button" onClick={addNewItem}>Submit</div>
                                    <div className="button" onClick={() => setIsAddingItem(false)}>Cancel</div>
                                </div>

                                { (error !== '') && <div className="error">{error}</div> }

                            </div>

                        </div>
                    
                    </div>
                }

                <div className="items">
                            
                    <div className="table">
                        <div className="header">Items</div>

                        <div className="col-header">
                            <div className="col id">ID</div>
                            <div className="col title">Title</div>
                            <div className="col created-by">Created By</div>
                            <div className="col created-at">Created At</div>
                        </div>

                        <ul>
                            { items.map((item, i) => {
                                return <ItemRow key={i} item={item}/>
                            }) }
                        </ul>
                    </div>

                </div>

            </div>

        </div>
	);
}
