import React from 'react';
import ReactDOM from 'react-dom';
import AdminApp from './AdminApp.jsx';
import {BrowserRouter} from 'react-router-dom';

const routedApp = (
    <BrowserRouter basename="/admin-app">
        <AdminApp />
    </BrowserRouter>
);

ReactDOM.render(routedApp, document.getElementById('admin-root'));
