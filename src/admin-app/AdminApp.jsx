import React, {Component, useState} from 'react';
import Layout from './Layout/Default.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './Pages/Login-page.jsx';
import DashPage from './Pages/Dash-page.jsx';
import NotFoundPage from './Pages/Notfound-page.jsx';

export const AppContext = React.createContext();

export const AdminApp = () => {

    const [isLogedIn, login] = useState(false);

    const appContext = {
        auth: {
            isLogedIn,
            login: () => login(true),
            logout: () => login(false)
        }
    }

    return (
        <AppContext.Provider value={appContext}>
        <Layout>
            {
                isLogedIn ? 
                <Switch>
                    <Route path="/" exact component={DashPage} />
                    <Route path="/vacancies" render={() => <div>vacancies</div>} />
                    <Route path="/subscribers" render={() => <div>subscribers</div>} />
                    <Route path="/applicants" render={() => <div>applicants</div>} />
                    <Route component={NotFoundPage} />
                </Switch> : 
                <Switch>
                    <Route 
                        path="/login" 
                        render={props => <LoginPage 
                            {...props}
                            isLogedIn={isLogedIn}
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
