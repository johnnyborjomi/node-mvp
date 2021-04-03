import React from 'react';

export default ({placeholder, type, name, validate, required, value, handler}) => {
    return (
        <div className="input-field">
            <input 
                onChange={handler}
                placeholder={placeholder} 
                name={name} 
                defaultValue={value}
                type={type} 
                required={!!required} 
                className={validate ? "validate" : ''}
            />
            <label htmlFor="title">{placeholder}</label>
            <span className="helper-text" data-error={'Please Fill' + placeholder}></span>
        </div>
    );
}