import React, { useEffect } from 'react';
import Auth from '../../lib/Auth';
import './style.scss';

export default function Logout({history}) {

    console.log('logout')
    
    useEffect(() => {
        Auth.logout();
        history.push('/login');
    }, [history]);

	return (
		<div id="logout" className="page">
            
            <div className="panel md">

                <div className="header">Logging Out...</div>

            </div>

        </div>
	);
}
