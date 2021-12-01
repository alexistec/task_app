import React from 'react';
import propTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';



export const PrivateRoute = ({
    isAuthenticated,
    component:Component,
    ...rest
}) => {

    localStorage.setItem('lasthPath', rest.location.pathname);


    return(
        <Route
            { ...rest }
            component={ (props) =>(
                (isAuthenticated)
                ? ( <Component {...props} /> )
                : ( <Redirect to="/auth/login" /> )
            )}

        />
    )

}

PrivateRoute.propTypes = {
    isAuthenticated : propTypes.bool.isRequired,
    component : propTypes.func.isRequired
}