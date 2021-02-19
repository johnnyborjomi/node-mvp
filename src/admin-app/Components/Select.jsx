import React from 'react';

export default ({options, placeholder, name, handler}) => {
    return (
        <>
        <div className="input-field select">
            <select name={name} defaultValue={""} onChange={handler}>
                <option value="" disabled>Choose your option</option>
                {options.map(option => <option 
                    key={option} 
                    value={option}>
                        {option}
                </option>)}
            </select>
            <label htmlFor={name}>{placeholder}</label>
        </div>
        </>
    );
}