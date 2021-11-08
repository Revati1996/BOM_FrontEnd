import React from "react";
import "./styles.css";
import Login from "./component/login/Login";
import Dashboard from "./component/dashboard/Dashboard";
import AccountTransaction from "./component/account/AccountTransaction";
import NewUserComponent from "./component/customer/NewUserComponent";
import ViewAllTickets from "./component/customer/ViewTickets";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ProtectedRoute from "./component/services/ProtectedRoute";

// import authenticatorClient from "./services/authenticator-api-client";

// const SecuredRoute = ({ component: Component, ...args }) => {
//   return (
//       <Route {...args} render={
//           (props) => authenticatorClient.isAuthenticated === true ? <Component {...props} /> :
//               <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
//       } />
//   );
// }

export default function App() {
  return (
    // <div className="container">
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/newuser">
          <NewUserComponent />
        </Route>
        <ProtectedRoute path="/dashboard">
          <Dashboard />
        </ProtectedRoute>
         {/* <SecuredRoute exact path="/login">
          <Dashboard />
        </SecuredRoute>  */}
        <Route exact path="/">
          <Redirect exact from="/" to="dashboard" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
        <Route path={`/accountTransaction`}>
                <AccountTransaction />
        </Route>
       
      </Switch>
      
    </Router>
    // </div>
  );
}
