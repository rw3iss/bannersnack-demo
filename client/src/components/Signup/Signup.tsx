import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInputRow from '../shared/FormInputRow';
import UserService from '../../lib/services/user.service';

import './style.scss';

export default function Signup({history}) {

    const [success, setSuccess] = useState(false) 
    const [error, setError] = useState('') 
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('') 
    
    function submit() {
        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        UserService.signup(email, password)
        .then((r: any) => {
            setSuccess(true)
        })
        .catch(e => {
            setError(e);
        });
    }

	return (
		<div id="signup" className="page">
            
            <div className="panel md">

                <div className="header">Signup</div>

                <div className="inner">

                    <div className="form">
                        <FormInputRow label="E-mail:" type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                        <FormInputRow label="Password:" type="password" onChange={(e) => setPassword(e.target.value)}  />
                        <FormInputRow label="Confirm Password:" type="password" onChange={(e) => setConfirmPassword(e.target.value)}  />
                    </div>

                    { (success !== false) && 
                        <div className="success">
                            <span>Success! You may login.</span>
                            <Link to="/login" className="button">Login</Link> 
                        </div>
                    }

                    { (error !== '') && <div className="error">{error}</div> }

                </div>

                <div className="actions">
                    <div className="button" onClick={submit}>Submit</div>
                </div>

            </div>

        </div>
	);
}
