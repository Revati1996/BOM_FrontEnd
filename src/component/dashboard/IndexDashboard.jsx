import React, { Component, Fragment } from "react";
import logo from '../logo/dashboard.png.jfif'
class IndexDashboard extends Component {
  render() {
    return (
      // <Fragment>
        // <h2>DashBoard Page </h2>
<img src= {require('../logo/dashboard.png.jfif').default} height={640} />
      // </Fragment>
    );
  }
}
export default IndexDashboard;
