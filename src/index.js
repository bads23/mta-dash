import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider, { UserContext } from './app/auth/context'
import './index.scss';
import App from './App';

ReactDOM.render(
    <UserProvider>
        <App />
    </UserProvider>,

document.getElementById('root'));
