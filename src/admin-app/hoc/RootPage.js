import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
    console.log('bread ', props)
    return (
        <>
            <div className="spacer"></div>
            <div>
                <Link to="/">Dashboard</Link>
                {props.breadcrumbs.map(breadcrumb => {
                    return breadcrumb.link ? 
                        <Link key={breadcrumb.name} to={breadcrumb.link}>{' > ' + breadcrumb.name}</Link>
                        : <strong key={breadcrumb.name}>{' > ' + breadcrumb.name}</strong>
                })}
            </div>
            <div className="row">
                <div className="col">
                    <h1>{props.title}</h1>
                </div>
            </div>
            {props.children}
        </>
    );
}