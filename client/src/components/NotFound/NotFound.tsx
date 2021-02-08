import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function NotFound({history}) {

	return (
		<div id="not-found" className="page">
            
            <div className="panel md">

                <div className="header">Page Not Found</div>
                
                <div className="inner">
                    <Link className="reset" to="/">Return</Link>
                </div>

            </div>
            
        </div>
	);
}
