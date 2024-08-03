import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () => {
    return (
        <Router>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
        </Router>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export default App;