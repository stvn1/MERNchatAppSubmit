import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>

            <Tabs>
              <TabList>
                <Tab>Title 1</Tab>
                <Tab>Title 2</Tab>
                <Tab>Title 3</Tab>
              </TabList>
              <TabPanel>
                <h2>Any content 1</h2>
                <p>lol</p>
                whatever i want
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
                <h1>hahaha</h1>
              </TabPanel>
              <TabPanel>
                <h2>Any content 3</h2>
              </TabPanel>
            </Tabs>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
