import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

export default (props) => {
    const [isMenuOpen, toggleMenu] = useState(false);
    
    const onMenuClick = (e) => {
        e.preventDefault();
        toggleMenu(!isMenuOpen);
    }

    const menuClass = isMenuOpen ? 'active' : '';
    
    return (
        <nav className="red">
            <div className="nav-wrapper container">
                <NavLink to="/" className="brand-logo">Admin Panel</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/">Home</a></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                        {/* if admin auth */}
                    <li><a href="/admin/logout">Log Out</a></li>
                    <li><small>Welcome, </small></li>
                </ul>
                <a href="#" className="sidenav-trigger right" onClick={onMenuClick}>
                    <i className="material-icons">menu</i>
                </a>
                <ul className={'sidenav ' + menuClass }>
                    <ul className="left">
                        <li className="active"><a href="/">Home</a></li>
                        {/* if admin auth */}
                        <li><a href="/vacancies">Admin Dashboard</a></li>
                    </ul>
                </ul>
            </div>
            <div className={'sidenav-overlay ' + menuClass} onClick={onMenuClick}></div>
        </nav>
    )
}