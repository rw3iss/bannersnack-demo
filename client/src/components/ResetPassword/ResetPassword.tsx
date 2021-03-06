import React, { useEffect, useState } from 'react';
import UserService from '../../lib/services/user.service';
import FormInputRow from '../shared/FormInputRow';
import Auth from '../../lib/Auth';
import './style.scss';

export default function ResetPassword({history}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false) 

    // todo: grab resetToken from url
    let resetToken = 'abc';
    
    useEffect(() => {
        if (Auth.isAuthenticated()) {
            return history.push('/dashboard');
        }
    }, [history]);

    function submit() {
        UserService.resetPassword(resetToken, password)
        .then(r => {
            setError('');
            setSuccess(r.success);
        })
        .catch(e => {
            setError(e);
        });
    }

	return (
		<div id="reset-password" className="page">
            
            <div className="panel md">

                <div className="header">Reset Password</div>

                <div className="inner">

                    Enter a new password to use:

                    <div className="form">
                        <FormInputRow label="New Password:" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                </div>

                { (success !== false) && 
                    <div className="success">
                        <span>Your password has been changed. You may now login.</span>
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
