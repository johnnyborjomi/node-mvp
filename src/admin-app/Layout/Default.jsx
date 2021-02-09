import React from 'react';
import Nav from './Nav/Nav.jsx';

export default (props) => {
    
    return (
        <div className="wrapper">
            <header>
                <Nav />
            </header>
            <main className="container main-wrapper">
                { props.children }
            </main>
        </div>
    )
}