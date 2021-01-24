import React from 'react'
import './style.scss';

export default function FormInputRow({ className = '', label = '', type = 'text', value = '', disabled = false, autoComplete = "on", onChange = (value: any)=>{} }) {
	return (
        <div className={'form-input-row ' + className}>

            <label>{label}</label>

            <div className="input-row">
                <input
                    type={type}
                    /*value={value}*/
                    disabled={disabled}
                    onChange={onChange}
                    autoComplete={autoComplete}
                />
            </div>

        </div>
	);
}

