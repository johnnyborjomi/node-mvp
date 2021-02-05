import React, {Component} from 'react';
import Layout from './Layout/Default.jsx';
import {Route} from 'react-router-dom';
import LoginPage from './Pages/Login-page.jsx';
import DashPage from './Pages/Dash-page.jsx';

class AdminApp extends Component {
    render() {
        return (
            <Layout>
                <Route path="/" exact component={DashPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/vacancies" render={() => <div>vacancies</div>} />
                <Route path="/subscribers" render={() => <div>subscribers</div>} />
                <Route path="/applicants" render={() => <div>applicants</div>} />
            </Layout>
        )
    }
}

export default AdminApp;