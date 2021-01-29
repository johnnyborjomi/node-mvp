import React from 'react';
import Nav from './Nav/Nav.jsx';

export default (props) => {
    
    return (
        <div className="wrapper">
            <header>
                <Nav />
            </header>
            <main>{ props.children }</main>
        </div>
    )
}