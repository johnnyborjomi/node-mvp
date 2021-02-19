import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

export default props => {
    
    useEffect(() => {
        document.title = props.title;
    })

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
            <h1>{props.title}</h1>
            {props.children}
        </>
    );
}