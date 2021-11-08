import React, { Component } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";

import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { withRouter } from "react-router";
import "./Dashboard.css";
import Master from "../master/Master";
import Pos from "../pos/Pos";
import IndexDashboard from "./IndexDashboard";
import NotFound from "../../404";

import AccountDetails from "../account/AccountDetails";
import AccountStatement from "../account/AccountStatement";
import AccountTransaction from "../account/AccountTransaction";
import NotificationComponent from "../notification/NotificationComponent";
import RaiseTicket from "../customer/RaiseTicket";
import ViewAllTickets from "../customer/ViewTickets"


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogout: false
    };
  }
  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      islogout: true
    });
  };
  render() {
    if (this.state.islogout) {
      return <Redirect to="/login" />;
    }
    const { match } = this.props;
    return (
      <div style={{ padding: "10px" }}>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand to="#home">State Bank Of Mysore</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link to={`${match.path}`}>Home</Link></Nav.Link>
              <NavDropdown title="Customer Service" id="collasible-nav-dropdown">
                <NavDropdown.Item> <Link to={`${match.path}/raiseConcerns`}>Raise Concerns</Link></NavDropdown.Item>
                <NavDropdown.Item> <Link to={`${match.path}/viewTickets`}>View Concerns</Link></NavDropdown.Item>
              
                <NavDropdown.Divider />
                {/* <NavDropdown.Item to="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="Account Service" id="collasible-nav-dropdown">
                <NavDropdown.Item ><Link to={`${match.path}/accountDetails`}>Account Details</Link></NavDropdown.Item>
                <NavDropdown.Item ><Link to={`${match.path}/accountTransaction`}>Account Transaction</Link> </NavDropdown.Item>
                <NavDropdown.Item ><Link to={`${match.path}/accountStatement`}>Account Statement</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                {/* <NavDropdown.Item to="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="Loan Service" id="collasible-nav-dropdown">
                <NavDropdown.Item to="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item to="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item to="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item to="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link><Link to={`${match.path}/notification`}>Notification</Link></Nav.Link>
              <button onClick={this.signOut} href="#">
                Sign Out
              </button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <main role="main">
          <div className="main">
            <Switch>
            <Route path={`${match.path}/accountDetails`}>
                <AccountDetails />
              </Route>
              <Route path={`${match.path}/accountStatement`}>
                <AccountStatement />
              </Route>
              <Route path={`${match.path}/accountTransaction`}>
                <AccountTransaction />
              </Route>
              <Route path={`${match.path}/raiseConcerns`}>
                <RaiseTicket/>
              </Route>
              <Route path={`${match.path}/viewTickets`}>
                <ViewAllTickets/>
              </Route>
              <Route path={`${match.path}/master`}>
                <Master />
              </Route>
              <Route path={`${match.path}/notification`}>
                <NotificationComponent />
              </Route>
              <Route path={`${match.path}/pos`}>
                <Pos />
              </Route>
              <Route exact path={`${match.path}`}>
                <IndexDashboard />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(Dashboard);
