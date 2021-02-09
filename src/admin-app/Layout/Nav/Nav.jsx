import React, {useState, useContext, useCallback} from 'react';
import {NavLink} from 'react-router-dom';
import {AppContext} from '../../AdminApp.jsx';

export default (props) => {
    const [isMenuOpen, toggleMenu] = useState(false);

    const appContext = useContext(AppContext);
    
    const onMenuClick = (e) => {
        e.preventDefault();
        toggleMenu(!isMenuOpen);
    }

    const menuClass = isMenuOpen ? 'active' : '';
    
    return (
        <nav className="red">
            <div className="nav-wrapper container">
                <NavLink to="/" className="brand-logo">Admin Panel</NavLink>
                <ul className="right hide-on-med-and-down">
                    <li><a href="/">Home</a></li>
                    {
                        appContext.auth.isLogedIn ?
                        <>
                        <li><NavLink exact to="/">Dashboard</NavLink></li>
                        <li><a onClick={appContext.auth.logout}>Log Out</a></li>
                        <li><small>Welcome, Admin</small></li>
                        </> :
                        <li><NavLink to="/login">Login</NavLink></li>
                    }
                </ul>
                <a href="#" className="sidenav-trigger right" onClick={onMenuClick}>
                    <i className="material-icons">menu</i>
                </a>
                <ul className={'sidenav ' + menuClass }>
                    <ul className="left">
                        <li><a href="/">Home</a></li>
                        {
                            appContext.auth.isLogedIn ?
                            <li><a onClick={appContext.auth.logout}>Log Out</a></li> :
                            <li><NavLink to="/login">Login</NavLink></li>
                        }
                        <li><NavLink exact to="/">Dashboard</NavLink></li>
                    </ul>
                </ul>
            </div>
            <div className={'sidenav-overlay ' + menuClass} onClick={onMenuClick}></div>
        </nav>
    )
}