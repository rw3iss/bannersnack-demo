import React, { useEffect, useState } from 'react';
import { Router, Link } from 'react-router-dom';
import Routes from '../Routes';
import { createBrowserHistory } from 'history';
import Auth from '../../lib/Auth';
import './style.scss';

const history = createBrowserHistory();

export function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    
    useEffect(() => {
        setIsLoggedIn(Auth.isAuthenticated())
    }, []);

    return (
        <div id="App">

            <Router history={history}>

                <header className="app-header">

                    <Link to="/" className="logo">Bannersnack</Link>

                    <nav>
                        { !isLoggedIn && <Link to="/login">Login</Link> }
                        { !isLoggedIn &&  <Link to="/signup">Signup</Link> }

                        { isLoggedIn &&  <Link to="/logout">Logout</Link> }
                    </nav>
                    
                </header>

                <div className="view-container">

                    <Routes />

                </div>

            </Router>

        </div>
    );
}

export default App;
