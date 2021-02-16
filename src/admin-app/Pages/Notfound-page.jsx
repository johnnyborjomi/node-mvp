import React from 'react';
import {NavLink} from 'react-router-dom';

export default () => {
    return (
        <>
            <h1>404 Error</h1>
            <p>Page not found</p>
            <NavLink to="/">Back to dashboard</NavLink>
        </>
    )
}

