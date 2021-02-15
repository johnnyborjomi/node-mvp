import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';

export default props => {

    useEffect(() => {
        document.title = props.title;
    })

    return (
        <>
            <h1>Dashboard</h1>

            <div className="card hoverable">
                <div className="card-content">
                    <NavLink to="/vacancies" className="card-title">Manage Vacancies</NavLink>
                </div>
            </div>

            <div className="card hoverable">
                <div className="card-content">
                    <NavLink to="/subscribers" className="card-title">Manage Subscribers</NavLink>
                </div>
            </div>

            <div className="card hoverable">
                <div className="card-content">
                    <NavLink to="/applicants" className="card-title">Manage Applicants</NavLink>
                </div>
            </div>
        </>
    )
}

