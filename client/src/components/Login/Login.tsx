import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FormInputRow from '../shared/FormInputRow';
import UserService from '../../lib/services/user.service';
import Auth from '../../lib/Auth';
import './style.scss';

export default function Login({history}) {

    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [error, setError] = useState('')
    
    useEffect(() => {
        if (Auth.isAuthenticated()) {
            return history.push('/dashboard');
        }
    });

    function submit() {
        UserService.login(email, password)
        .then((r: any) => {
            setError('');
            history.push('/dashboard');
        })
        .catch(e => {
            setError(e);
        });
    }

	return (
		<div id="login" className="page">
            
            <div className="panel md">

                <div className="header">Login</div>

                <div className="inner">

                    <div className="form">
                        <FormInputRow label="E-mail:" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                        <FormInputRow label="Password:" type="password" onChange={(e) => setPassword(e.target.value)}  />
                    </div>

                </div>
                    
                { (error !== '') && <div className="error">{error}</div> }

                <div className="actions">
                    <div className="button" onClick={submit}>Submit</div>
                </div>

                <Link className="reset" to="/forgot-password">Forgot Password?</Link>

            </div>

        </div>
	);
}
