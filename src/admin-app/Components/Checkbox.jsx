import React from 'react';

export default props => {
    return (
        <label>
            <input 
                id={props.id} 
                onChange={props.handler} 
                type="checkbox" 
                defaultChecked={props.checked}
                name={props.name} />
            <span>{props.label}</span>
        </label>
    )
}