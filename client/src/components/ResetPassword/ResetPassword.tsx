import React, { useState } from 'react';
import FormInputRow from '../shared/FormInputRow';
import './style.scss';

// Todo

export default function ResetPassword() {

    const [email, setEmail] = useState('');
    
    function submit() {
        //let data = { email };
        // todo: submit to service layer
    }

	return (
		<div id="reset-password" className="page">
            
            <div className="panel md">

                <div className="header">Reset Password</div>

                <div className="inner">

                    <div className="form">
                        <FormInputRow label="E-mail:" onChange={(e) => setEmail(e.target.value)} />
                    </div>

                </div>

                <div className="actions">
                    <div className="button" onClick={submit}>Submit</div>
                </div>

            </div>

        </div>
	);
}
