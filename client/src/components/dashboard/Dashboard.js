import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import Table from "react-bootstrap/Table";

//
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//TableRows Components
import EventsTableRow from "./sub-components/eventsTableRow";
import RoomsTableRow from "./sub-components/roomsTableRow";
import ChatTableRow from "./sub-components/chatTableRow";

//Create room
import CreateRoom from "./sub-components/createRoom";
import EditRoom from "./sub-components/editRoom";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      chats: [],
      rooms: []
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  //Get Data
  componentDidMount() {
    axios
      .get("http://localhost:3001/events/")
      .then(res => {
        console.log(res);
        this.setState({
          events: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/rooms/")
      .then(res => {
        console.log(res);
        this.setState({
          rooms: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/chat/")
      .then(res => {
        console.log(res);
        this.setState({
          chats: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  DataTable() {
    return this.state.events.map((res, i) => {
      return <EventsTableRow obj={res} key={i} />;
    });
  }
  DataTable2() {
    return this.state.rooms.map((res, i) => {
      return <RoomsTableRow obj={res} key={i} />;
    });
  }
  DataTable3() {
    return this.state.chats.map((res, i) => {
      return <ChatTableRow obj={res} key={i} />;
    });
  }
  render() {
    const { user } = this.props.auth;
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                <span style={{ fontFamily: "monospace" }}>MERN</span> app
              </p>
            </h4>
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
            {/* Edit and create */}

            <Tabs>
              <TabList>
                <Tab>Events List</Tab>
                <Tab>Rooms</Tab>
                <Tab>Chats</Tab>
              </TabList>

              <TabPanel>
                <div className="table-wrapper">
                  <div className="table-wrapper">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Created at:</th>
                        </tr>
                      </thead>
                      <tbody>{this.DataTable()}</tbody>
                    </Table>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <Router>
                  <div>
                    <Container>
                      <Navbar.Brand>
                        <Link to={"/create-room"} className="nav-link">
                          Create a room
                        </Link>
                        <Link to={"/edit-room"} className="nav-link"></Link>
                      </Navbar.Brand>
                    </Container>

                    <Container>
                      <Row>
                        <Col md={12}>
                          <div className="wrapper">
                            <Switch>
                              <Route
                                path="/create-room"
                                component={CreateRoom}
                              />
                              <Route
                                path="/edit-rooms/:id"
                                component={EditRoom}
                              />
                              {/* <Route
                                path="/edit-room/:id"
                                component={EditRoom}
                              /> */}
                              {/* <Route path="/edit-student/:id" component={EditStudent} />
                  <Route path="/student-list" component={StudentList} /> */}
                            </Switch>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Router>
                <div className="table-wrapper">
                  <div className="table-wrapper">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Room Name:</th>
                        </tr>
                      </thead>
                      <tbody>{this.DataTable2()}</tbody>
                    </Table>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="table-wrapper">
                  <div className="table-wrapper">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Chat:</th>
                          <th>Sent by:</th>
                          <th>From Room :</th>
                        </tr>
                      </thead>
                      <tbody>{this.DataTable3()}</tbody>
                    </Table>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
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
