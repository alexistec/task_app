import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { TaskScreen } from "../components/task/TaskScreen";
import { AuthRouter } from "./AuthRouter";

import { firebase } from "../firebase/firebaseConfig";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRouter";
import { loadNotes } from "../helpers/loadNotes";
import { setNotes, startLoadingNotes } from "../actions/task";
import { startLoading } from "../actions/ui";



export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn , setIsLoggedIn ] = useState(false);
 
    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async (user) => {
            if ( user?.uid ){

                dispatch( login( user.uid, user.displayName ) )
                setIsLoggedIn(true);

                dispatch( startLoadingNotes(user.uid) );

            }else {
                setIsLoggedIn(false)
            }

            setChecking(false);

        });

    }, [ dispatch, setChecking, setIsLoggedIn ])

    if( checking ){
        return(
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={ isLoggedIn }
                        path='/'
                        component={ TaskScreen }
                    />
                    <Redirect
                        to="/auth/login" 
                    />
                </Switch>
            </div>
        </Router>
    )
}
