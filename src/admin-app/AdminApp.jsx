import React, {Component, useEffect, useState} from 'react';
import Layout from './Layout/Default.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './Pages/Login-page.jsx';
import DashPage from './Pages/Dash-page.jsx';
import NotFoundPage from './Pages/Notfound-page.jsx';

export const AppContext = React.createContext();

export const AdminApp = () => {

    const [isLoggedIn, login] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const appContext = {
        auth: {
            isLoggedIn,
            login: () => login(true), 
            logout: () => login(false)
        }
    }

    useEffect(async () => {
        console.log(isLoggedIn)
        const res = await fetch('/admin-api/auth/check');
        const data = await res.json();
        console.log(isLoggedIn)
        data.isLoggedIn ? login(true) : login(false);
        setIsLoading(false);
        console.log(isLoggedIn)

    })

    return (
        <AppContext.Provider value={appContext}>
        <Layout>
            {
                isLoading ?
                    null :
                    isLoggedIn ? 
                    <Switch>
                        <Route path="/" exact component={DashPage} />
                        <Route path="/vacancies" render={() => <div>vacancies</div>} />
                        <Route path="/subscribers" render={() => <div>subscribers</div>} />
                        <Route path="/applicants" render={() => <div>applicants</div>} />
                        <Redirect from={'/login'} to={'/'}/>
                        <Route component={NotFoundPage} />
                    </Switch> 
                    : 
                    <Switch>
                        <Route 
                            path="/login" 
                            render={props => <LoginPage 
                                {...props}
                                isLoggedIn={isLoggedIn}
                                handleLogin={() => login(true)}
                                />} 
                        />
                        <Redirect from={'/'} to={'/login'}/>
                    </Switch> 
            }
            
        </Layout>
        </AppContext.Provider>
    )
}
