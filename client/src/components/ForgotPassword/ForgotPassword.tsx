import React, { useEffect, useState } from 'react';
import UserService from '../../lib/services/user.service';
import FormInputRow from '../shared/FormInputRow';
import Auth from '../../lib/Auth';
import './style.scss';

export default function ForgotPassword({history}) {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false) 
    
    useEffect(() => {
        if (Auth.isAuthenticated()) {
            return history.push('/dashboard');
        }
    }, [history]);

    function submit() {
        UserService.forgotPassword(email)
        .then(r => {
            setError('');
            setSuccess(r.success);
        })
        .catch(e => {
            setError(e);
        });
    }

	return (
		<div id="forgot-password" className="page">
            
            <div className="panel md">

                <div className="header">Forgot Password</div>

                <div className="inner">

                    <div className="form">
                        <FormInputRow label="E-mail:" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                </div>

                { (success !== false) && 
                    <div className="success">
                        <span>Please check your email.</span>
                    </div>
                }

                { (error !== '') && <div className="error">{error}</div> }
                
                <div className="actions">
                    <div className="button" onClick={submit}>Submit</div>
                </div>

            </div>

        </div>
	);
}
