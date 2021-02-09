import React, {Component} from 'react';
import Layout from './Layout/Default.jsx';
import {Route, Switch, Redirect} from 'react-router-dom';
import LoginPage from './Pages/Login-page.jsx';
import DashPage from './Pages/Dash-page.jsx';
import NotFoundPage from './Pages/Notfound-page.jsx';

class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false
        }
    }

    render() {
        return (
            <Layout>
                {
                    this.state.isLogined ? 
                    <Switch>
                        <Route path="/" exact component={DashPage} />
                        <Route path="/vacancies" render={() => <div>vacancies</div>} />
                        <Route path="/subscribers" render={() => <div>subscribers</div>} />
                        <Route path="/applicants" render={() => <div>applicants</div>} />
                        <Route component={NotFoundPage} />
                    </Switch> :
                    <Redirect from={} to={}/>
                    // <Route path="/" component={LoginPage} />
                }
                
            </Layout>
        )
    }
}

export default AdminApp;