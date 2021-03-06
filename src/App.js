import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import React from "react";
import {AuthProvider} from "./utils/auth";
import Login from "./views/Login";
import {updateAdan} from "./components/Main/updateAdan";
import Registration from "./layouts/Registration";

const App = () => {
    return (
        <AuthProvider>
            <Switch>
                <Route path="/admin" render={(props) => <AdminLayout {...props} />}/>
                <Route path='/' component={Login}/>
                {/*<Route path='/register' component={Registration}/>*/}
            </Switch>
        </AuthProvider>
    )
}
export default App