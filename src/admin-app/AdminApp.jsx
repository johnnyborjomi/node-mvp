import React, {Component, useEffect, useState} from 'react';
import Layout from './Layout/Default.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './Pages/Login-page.jsx';
import DashPage from './Pages/Dash-page.jsx';
import VacanciesPage from './Pages/Vacancies-page.jsx';
import SingleVacancyPage from './Pages/Single-vacancy-page.jsx';
import VacancyAddPage from './Pages/Vacancy-add.jsx';
import VacancyDeletePage from './Pages/Vacancy-delete.jsx';
import VacancyEditPage from './Pages/Vacancy-edit.jsx';
import SubsPage from './Pages/Subs-page.jsx';
import ApplicantsPage from './Pages/Applicants-page.jsx';
import NotFoundPage from './Pages/Notfound-page.jsx';
import RootPage from './hoc/RootPage';

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
                        <Route 
                            path="/" 
                            exact 
                            render={props => <DashPage title="Admin Dashboard"/>} 
                        />
                        <Route 
                            path="/vacancies" 
                            render={props => {
                                return (
                                    <RootPage 
                                        title="Vacancies Page"
                                        breadcrumbs={[{name: "Vacancies"}]}>
                                        <VacanciesPage {...props} />
                                    </RootPage>
                                );
                            }}
                        />
                        <Route 
                            path="/vacancy/add" 
                            exact
                            render={props => {
                                return (
                                    <RootPage
                                        title="Add New Vacancy"
                                        breadcrumbs={[
                                            {name: 'Vacancies', link: '/vacancies'},
                                            {name: "Add Vacancy"}
                                            ]}>
                                        <VacancyAddPage {...props}/>
                                    </RootPage>
                                );
                            }} 
                        />
                        <Route 
                            path="/vacancy/:id" 
                            exact
                            render={
                                props => <SingleVacancyPage {...props}/>
                            } 
                        />
                        <Route 
                            path="/vacancy/:id/delete" 
                            exact
                            render={
                                props => <VacancyDeletePage {...props}/>
                            } 
                        />
                        <Route 
                            path="/vacancy/:id/edit" 
                            exact
                            render={
                                props => <VacancyEditPage {...props}/>
                            } 
                        />
                        <Route 
                            path="/subscribers" 
                            render={props => {
                                return (
                                    <RootPage 
                                        title="Subscribers Page"
                                        breadcrumbs={[{name: "Subscribers"}]}>
                                        <SubsPage {...props} />
                                    </RootPage>
                                )
                            }} 
                        />
                        <Route 
                            path="/applicants" 
                            render={props => {
                                return (
                                    <RootPage 
                                        title="Applicants Page" 
                                        breadcrumbs={[{name: "Applicants"}]}>
                                        <ApplicantsPage {...props} />
                                    </RootPage>
                                );
                            }} 
                        />
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
